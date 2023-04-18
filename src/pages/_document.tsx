import { Html, Head, Main, NextScript } from "next/document";
import GlobalStyles from "@/styles/GlobalStyles";

export default function Document() {
  return (
    <Html lang="en">
      <GlobalStyles />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
