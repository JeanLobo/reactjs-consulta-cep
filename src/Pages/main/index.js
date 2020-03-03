import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  FaAddressBook,
  FaSearch,
  FaSpinner,
  FaCheckCircle,
  FaExpandArrowsAlt,
} from 'react-icons/fa';

import { MdError } from 'react-icons/md';

import { Form, SubmitButton, Button, List, MenssageToast } from './styles';

export default function Main() {
  const [cepSearch, setCepSearch] = useState('');
  const [cepResults, setCepResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Carregar os dados do localStorage
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('cepResults'));
    setCepResults(results === null ? [] : results);
  }, []);

  // Salvar os dados do localStorage
  useEffect(() => {
    localStorage.setItem('cepResults', JSON.stringify(cepResults));
  }, [cepResults]);

  function notifyUser(message, isError = false) {
    if (isError) {
      toast.error(
        <>
          <MenssageToast>
            <MdError size={24} /> {message}
          </MenssageToast>
        </>,
        {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      toast.success(
        <>
          <MenssageToast>
            <FaCheckCircle size={24} /> {message}
          </MenssageToast>
        </>,
        {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError(false);

    try {
      //Checando se o cep foi preenchido
      if (cepSearch === '')
        throw notifyUser(' É necessário informar um CEP.', true);

      //Checando se o cep já foi adicionado
      const hasEnd = cepResults.find(
        end => end.cep.replace('-', '') === cepSearch
      );

      if (hasEnd) throw notifyUser(' CEP duplicado abaixo!', true);

      const response = await api.get(`/${cepSearch}/json/`);

      if (response.data) {
        setCepResults([...cepResults, response.data]);
        setCepSearch('');
        notifyUser(' CEP encontrado com Sucesso!!!');
      } else {
        notifyUser(' CEP não encontrado.', true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>
        <FaAddressBook />
        Consultar CEP
      </h1>

      <Form onSubmit={handleSubmit} error={error}>
        <input
          type="text"
          placeholder="Consultar CEP"
          value={cepSearch}
          onChange={e => setCepSearch(e.target.value.replace('-', ''))}
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaSearch color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {cepResults.map(cepResult => (
          <li key={cepResult.cep}>
            <span>
              <strong>{cepResult.cep}</strong> - {cepResult.logradouro}
            </span>
          </li>
        ))}
      </List>
      <ToastContainer />
    </Container>
  );
}
