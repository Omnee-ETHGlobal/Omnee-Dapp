// src/config/apolloClient.ts

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.studio.thegraph.com/proxy/82878/omnee-deploys/version/latest/", 
  }),
  cache: new InMemoryCache(),
});

export default client;
