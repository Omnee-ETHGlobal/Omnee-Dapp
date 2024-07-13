import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '@/context/web3UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <UserProvider>
      <Component {...pageProps} />
      </UserProvider>
  );
};

export default MyApp;
