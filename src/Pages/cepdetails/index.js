import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';

import viaCepApi from '../../services/viaCepApi';

import { MdPlace, MdArrowBack } from 'react-icons/md';

export default props => {
  const [cepResults, setCepResults] = useState([]);

  async function handleSearchCep() {
    const { cep } = props.match.params;

    const response = await viaCepApi.get(`/${cep}/json/`);

    setCepResults(response.data);
  }

  useEffect(() => {
    handleSearchCep();
  }, []);

  function goBack() {
    console.log('Clicou em goBack()');
    props.history.goBack();
  }

  return (
    <Container>
      <h1>
        <MdPlace size={22} />
        Detalhes do CEP
      </h1>

      <strong>
        <h2>{cepResults.cep}</h2>
      </strong>
      <p>{cepResults.logradouro}</p>

      <Button onClick={goBack}>
        <MdArrowBack size={20} />
      </Button>
    </Container>
  );
};
