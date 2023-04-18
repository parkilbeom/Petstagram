import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
   ${reset}
   ${normalize}
`;

export default GlobalStyles;
