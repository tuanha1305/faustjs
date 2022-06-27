import 'normalize.css/normalize.css';
import 'styles/main.scss';
import React from 'react';
import client from 'client';
import { FaustNXProvider } from "faust-nx";
import ThemeStyles from 'components/ThemeStyles/ThemeStyles';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeStyles />
      <FaustNXProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustNXProvider>
    </>
  );
}
