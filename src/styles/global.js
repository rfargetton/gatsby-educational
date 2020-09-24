import { createGlobalStyle } from "styled-components" ;

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.bg};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.highlight};
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
`

export default GlobalStyle ;