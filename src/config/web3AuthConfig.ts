import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const clientId = "BIi6D1Cf-rsvI2-BANoKtkdrRDZxHfZvylo0Af4ZTEpq60QbvjUMOAfQzMr5dRnngkcVRbT_4IrNZekQa3nQ92o"; 

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x14a34", 
    rpcTarget: "https://sepolia.base.org", 
    displayName: "Base Sepolia",
    blockExplorerUrl: "https://sepolia-explorer.base.org", 
    ticker: "ETH",
    tickerName: "Ethereum on Base Sepolia",
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  export  const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    privateKeyProvider,
    uiConfig: {
      loginMethodsOrder: ["google", "metamask"], 
      mode: "dark",
      appName: "OmneeFun",
    },
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      clientId,
      network: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
      uxMode: "popup",
      loginConfig: {
        google: {
          verifier: "omneefun-eth-global",
          typeOfLogin: "google",
          clientId: "296126650314-6emlcmvt4qbbqiam5mt6bpmmkdqn54p0.apps.googleusercontent.com", 
        },
      },
    },
  });
    
  const metamaskAdapter = new MetamaskAdapter({
    clientId,
  });
  
  web3auth.configureAdapter(openloginAdapter);
  web3auth.configureAdapter(metamaskAdapter);