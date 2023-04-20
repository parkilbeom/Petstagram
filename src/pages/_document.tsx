import { Html, Head, Main, NextScript } from "next/document";
import GlobalStyles from "@/styles/GlobalStyles";

export default function Document() {
  return (
    <>
      <GlobalStyles />
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  );
}
