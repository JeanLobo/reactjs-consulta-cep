import React, { useState, useEffect } from 'react';

import Container from '../../components/Container';
import ButtonText from '../../components/ButtonText';
import MapCepSearch from '../../components/MapCepSearch';

import { CepDetails } from './styles';

import { MdPlace, MdArrowBack, MdMap } from 'react-icons/md';

export default props => {
  const [cepDetails, setCepDetails] = useState([]);

  function handleSearchCep() {
    const cepResults = JSON.parse(localStorage.getItem('cepResults'));
    const { cep } = props.match.params;
    const cepFound = cepResults.find(end => end.cep === cep);

    setCepDetails(cepFound);
  }

  useEffect(() => {
    handleSearchCep();
  }, []);

  function goBack() {
    props.history.goBack();
  }

  return (
    <Container>
      <h1>
        <MdPlace size={22} />
        Detalhes do endereço.
      </h1>

      <CepDetails>
        <h2>
          Cep: {cepDetails.cep} Ibge: {cepDetails.ibge}
        </h2>

        <div>
          <p>{cepDetails.logradouro}</p>
          <p>
            {cepDetails.bairro} - {cepDetails.localidade} - {cepDetails.uf}
          </p>

          <h3>
            Latitude: {cepDetails.latt} Longitude: {cepDetails.longt}
          </h3>

          <ButtonText onClick={goBack}>
            <MdArrowBack size={20} /> Voltar
          </ButtonText>
        </div>
      </CepDetails>
      <br />
      <h1>
        <MdMap size={22} />
        Mapa do endereço.
      </h1>
      <MapCepSearch
        lattGeolocation={cepDetails.latt}
        longtGeolocation={cepDetails.longt}
      />
    </Container>
  );
};
