import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '@/context/web3UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import client from '@/config/apolloClient';
import { ApolloProvider } from '@apollo/client';


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <ApolloProvider client={client}>
    <UserProvider>
      <Component {...pageProps} />
      </UserProvider>
      </ApolloProvider>
  );
};

export default MyApp;
