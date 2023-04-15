import { AppProps } from 'next/app';

export default function AdminRoot({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
