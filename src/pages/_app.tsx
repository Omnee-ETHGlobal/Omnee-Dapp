import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { UserProvider } from "@/context/web3UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../style.css";
import '@rainbow-me/rainbowkit/styles.css';
import client from "@/config/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { WagmiProvider } from "wagmi";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Script from "next/script";
import AOS from "aos";
import "aos/dist/aos.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { web3Config } from "@/config";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const queryClient = new QueryClient();

  return (
      <WagmiProvider config={web3Config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            <ApolloProvider client={client}>
              <Head>
                <link
                  rel="shortcut icon"
                  href="/images/favicon.png"
                  type="image/png"
                />
              </Head>
              <Component {...pageProps} />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
              />
              <Script
                src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                strategy="beforeInteractive"
              />
              <Script
                src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"
                strategy="beforeInteractive"
              />
              <Script
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
                strategy="beforeInteractive"
              />
              <Script
                src="https://cdn.jsdelivr.net/npm/aos@2.3.1/dist/aos.js"
                strategy="beforeInteractive"
              />
            </ApolloProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
      </WagmiProvider>
  );
};

export default MyApp;
