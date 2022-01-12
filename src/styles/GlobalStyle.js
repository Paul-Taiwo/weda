/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { createGlobalStyle } from "styled-components";

const theme = {};

const GlobalStyle = createGlobalStyle`
  :root {
    --c-black: #000000;
    --c-white: #FFFFFF;
  }

  html,body {
    overflow-x: hidden;
    background-color: var(--c-black1);
    font-size: 16px;
    ${"" /* color: var(--c-white); */}
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
		font-family: 'Nunito', sans-serif !important;
    font-weight: 300;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
  }

  .object-fit-cover {
    object-fit: cover;
  }

  .object-position-center {
    object-position: center;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .spacer-bottom {
    margin-bottom: 3rem;
  }

  .no-pointer-events {
    pointer-events: none;
  }
`;

export default GlobalStyle;
export { theme };
