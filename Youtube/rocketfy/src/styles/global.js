import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle `
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

html, body, #root {
  height: 100vh;
}

body {
  font: normal 14px/1em 'Roboto', Sans-Serif;
  background: #ecf1f8;
  color: #333;
  -webkit-font-smoothing: antialiased !important;
}

ul {
  list-style: none;
}
`;