import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store from "../redux/store";
import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import reset from "styled-reset";
import LoginCheck from "@/components/loginCheck";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <LoginCheck />
        <GlobalStyles />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
   ${reset}
   ${normalize}
`;
