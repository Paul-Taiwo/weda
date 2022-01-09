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

  @font-face {
    font-family: "NeurialGrotesk-Light";
    src: url(/assets/fonts/NeurialGrotesk-Light.otf) format('opentype');
    font-weight: 300;
  }
  @font-face {
    font-family: "NeurialGrotesk-LightItalic";
    src: url(/assets/fonts/NeurialGrotesk-LightItalic.otf) format('opentype');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: "NeurialGrotesk";
    src: url(/assets/fonts/NeurialGrotesk-Regular.otf) format('opentype');
    font-weight: 400;
  }
  @font-face {
    font-family: "NeurialGrotesk-Italic";
    src: url(/assets/fonts/NeurialGrotesk-Italic.otf) format('opentype');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: "NeurialGrotesk-Medium";
    src: url(/assets/fonts/NeurialGrotesk-Medium.otf) format('opentype');
    font-weight: 500;
  }
  @font-face {
    font-family: "NeurialGrotesk-MediumItalic";
    src: url(/assets/fonts/NeurialGrotesk-MediumItalic.otf) format('opentype');
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: "NeurialGrotesk-Bold";
    src: url(/assets/fonts/NeurialGrotesk-Bold.otf) format('opentype');
    font-weight: 700;
  }
  @font-face {
    font-family: "NeurialGrotesk-BoldItalic";
    src: url(/assets/fonts/NeurialGrotesk-BoldItalic.otf) format('opentype');
    font-weight: 700;
    font-style: italic;
  }
  @font-face {
    font-family: "NeurialGrotesk-Extrabold";
    src: url(/assets/fonts/NeurialGrotesk-Extrabold.otf) format('opentype');
    font-weight: 800;
  }
  @font-face {
    font-family: "NeurialGrotesk-ExtraboldItalic";
    src: url(/assets/fonts/NeurialGrotesk-ExtraboldItalic.otf) format('opentype');
    font-weight: 800;
    font-style: italic;
  }

  html,body {
    overflow-x: hidden;
    background-color: var(--c-black1);
    font-family: "NeurialGrotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    color: var(--c-white);
		background: red;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
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
