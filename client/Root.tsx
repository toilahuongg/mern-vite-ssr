import { AppProps } from "next/app";
import Header from "@client/components/Layout/Header";
import Footer from "@client/components/Layout/Footer";

export default function ClientRoot({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
