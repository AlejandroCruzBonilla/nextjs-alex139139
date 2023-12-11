import { AppProps } from 'next/app';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { CustomPassThrough } from '@/libraries/primeReact';

import '@/styles/app.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider  value={{ unstyled: true, ripple: true, pt: CustomPassThrough() }}>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}
