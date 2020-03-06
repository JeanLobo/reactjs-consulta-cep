import axios from 'axios';

const geoCodeApi = axios.create({
  baseURL: 'https://geocode.xyz',
});

export default geoCodeApi;
