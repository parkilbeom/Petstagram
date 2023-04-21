import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store from "../redux/store";
import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import reset from "styled-reset";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
   ${reset}
   ${normalize}
`;
