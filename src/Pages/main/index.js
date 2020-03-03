import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import Container from '../../components/Container';
import { FaAddressBook, FaSearch, FaSpinner } from 'react-icons/fa';
import { Form, SubmitButton, List } from './styles';

export default function Main() {
  const [cepSearch, setCepSearch] = useState('');
  const [cepResults, setCepResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function notifyUser(message, isError = false) {
    if (isError) {
      toast.error(
        <>
          <FaAddressBook /> {message}
        </>,
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError(false);

    try {
      //Checando se o cep foi preenchido
      if (cepSearch === '')
        throw notifyUser(' Você precisa informar um CEP.', true);

      //Checando se o cep já foi adicionado
      const hasEnd = cepResults.find(
        end => end.cep.replace('-', '') === cepSearch
      );

      if (hasEnd) throw notifyUser(' CEP duplicado abaixo!', true);

      const response = await api.get(`/${cepSearch}/json/`);

      console.log(response);

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
          onChange={e => setCepSearch(e.target.value)}
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
            <span>{cepResult.logradouro}</span>
          </li>
        ))}
      </List>
      <ToastContainer />
    </Container>
  );
}
