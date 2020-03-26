import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import viaCepApi from '../../services/viaCepApi';
import geoCodeApi from '../../services/geoCodeApi';

import Container from '../../components/Container';
import Button from '../../components/Button';

import {
  FaSearch,
  FaSpinner,
  FaCheckCircle,
  FaExpandArrowsAlt,
} from 'react-icons/fa';

import { MdPlace, MdError, MdDelete } from 'react-icons/md';
import { Form, SubmitButton, List, MenuGroup, MenssageToast } from './styles';

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
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá desfazer essa exclusão!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, pode excluir!',
    }).then(result => {
      if (result.value) {
        const cepResultsNew = cepResults.filter(
          end => end.cep.replace('-', '') !== cep.replace('-', '')
        );

        setCepResults(cepResultsNew);

        Swal.fire('Excluido!', 'Você excluiu o cep selecionado.', 'success');
      }
    });

    //notifyUser(' CEP removido com Sucesso!!!');
  }

  async function handleSearchCoordinatesByZipCode(cep) {
    const response = await geoCodeApi.get(`/${cep}?json=1`);

    const { latt, longt } = response.data;

    return { latt, longt };
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

      const response = await viaCepApi.get(`/${cepSearch}/json/`);

      const endSearch = response.data;

      if (response.data) {
        const { latt, longt } = await handleSearchCoordinatesByZipCode(
          endSearch.cep
        );

        const endSearchCoordinate = { ...endSearch, latt, longt };

        setCepResults([...cepResults, endSearchCoordinate]);
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
