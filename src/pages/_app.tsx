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
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    getUserUid().then(() => {
      setRender(true);
    });
  }, []);
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <Navigate />
        {render ? (
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
   body {
    font-family: 'Pretendard', sans-serif;
  }
  .a11y-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;
