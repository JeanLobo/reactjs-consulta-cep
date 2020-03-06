import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';

import api from '../../services/api';

import { MdPlace, MdArrowBack } from 'react-icons/md';

import { CepDetalhes } from './styles';

export default function CepDetails() {
  const [cepResults, setCepResults] = useState([]);

  useEffect(async () => {
    const { cep } = '58081270'; //this.props.match.params;

    const response = await api.get(`/${cep}/json/`);

    setCepResults(response.data);
  }, []);

  return (
    <Container>
      <h1>
        <MdPlace size={22} />
        Detalhes do CEP
      </h1>
      <CepDetalhes>
        <Link to={'/'}>
          <MdArrowBack size={20} />
        </Link>
      </CepDetalhes>
    </Container>
  );
}
