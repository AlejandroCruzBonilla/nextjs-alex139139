import { AppProps } from 'next/app';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { useCustomPassThrough } from '@/libraries/primeReact';
import { usePassThrough } from 'primereact/passthrough';
import Tailwind, {
  global,
  button,
} from '@/libraries/primeReact/passthroughTailwind';

import '@/styles/app.scss';

export default function App({ Component, pageProps }: AppProps) {
  const { customPassThrough } = useCustomPassThrough();

  return (
    <PrimeReactProvider
      value={{ unstyled: true, ripple: true, pt: customPassThrough }}
    >
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}
