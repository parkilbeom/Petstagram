import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store from "../redux/store";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
