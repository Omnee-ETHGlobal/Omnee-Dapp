import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { UserProvider } from "@/context/web3UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "../style.css";
import client from "@/config/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { WagmiProvider } from "wagmi";
import { web3Config } from "@/config";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Script from "next/script";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <WagmiProvider config={web3Config}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={client}>
            <Head>
              <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
            <Script 
              src="/script.js"
              strategy="afterInteractive" 
            />
          </ApolloProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </UserProvider>
  );
};

export default MyApp;
