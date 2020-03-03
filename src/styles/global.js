import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin:0;
    padding: 0;
    outline: 0;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }


`;
