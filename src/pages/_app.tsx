import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store from "../redux/store";
import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import reset from "styled-reset";
import LoginCheck from "@/components/loginCheck";
import Navigate from "@/components/Navigate";
import { useEffect, useState } from "react";
import { getUserUid } from "@/firebase/utils";

export default function App({ Component, pageProps }: AppProps) {
  const [lender, setLender] = useState<boolean>(false);
  useEffect(() => {
    getUserUid().then(() => {
      setLender(true);
    });
  }, []);
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <Navigate />
        {lender ? (
          <>
            <LoginCheck />
          </>
        ) : null}
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
   ${reset}
   ${normalize}
`;
