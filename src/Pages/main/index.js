import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  FaSearch,
  FaSpinner,
  FaCheckCircle,
  FaExpandArrowsAlt,
} from 'react-icons/fa';

import { MdPlace, MdError, MdDelete } from 'react-icons/md';
import {
  Form,
  SubmitButton,
  Button,
  List,
  MenuGroup,
  MenssageToast,
} from './styles';

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

  function handleDeleteCep(cep) {
    const cepResultsNew = cepResults.filter(
      end => end.cep.replace('-', '') !== cep.replace('-', '')
    );

    setCepResults(cepResultsNew);
    notifyUser(' CEP removido com Sucesso!!!');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError(false);

    try {
      //Checando se o cep foi preenchido
      if (cepSearch === '') throw notifyUser(' Informe o CEP.', true);

      //Checando se o cep foi preenchido corretamente
      if (cepSearch.replace('-', '').length !== 8)
        throw notifyUser(' Informe um CEP válido.', true);

      //Checando se o cep já foi adicionado
      const hasEnd = cepResults.find(
        end => end.cep.replace('-', '') === cepSearch.replace('-', '')
      );

      if (hasEnd) throw notifyUser(' O CEP já está na lista abaixo.', true);

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
        <MdPlace size={22} />
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
              <>
                <strong>{cepResult.cep}</strong>
                {cepResult.logradouro}
              </>
              <MenuGroup>
                <Button onClick={() => handleDeleteCep(cepResult.cep)}>
                  <MdDelete size={18} />
                </Button>
                <Link to={`/cepdetails/${cepResult.cep}`}>
                  <FaExpandArrowsAlt size={14} />
                </Link>
              </MenuGroup>
            </span>
          </li>
        ))}
      </List>
      <ToastContainer />
    </Container>
  );
}
