import React, { useState } from 'react';

import api from '../../services/api';

import Container from '../../components/Container';
import { FaAddressBook, FaSearch, FaSpinner } from 'react-icons/fa';
import { Form, SubmitButton } from './styles';

export default function Main() {
  const [cepSearch, setCepSearch] = useState('');
  const [cepResults, setCepResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    const response = await api.get(`/${cepSearch}/json/`);

    console.log(response.data);

    if (response.data) {
      setCepResults([...cepResults, response.data]);
      setCepSearch('');
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>
        <FaAddressBook />
        Consultar CEP
      </h1>

      <Form onSubmit={handleSubmit}>
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
    </Container>
  );
}
