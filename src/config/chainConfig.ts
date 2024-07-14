// chainConfig.ts

import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

export const baseSepoliaConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14a34",
  rpcTarget: "https://sepolia.base.org",
  displayName: "Base Sepolia",
  blockExplorerUrl: "https://sepolia-explorer.base.org",
  ticker: "ETH",
  tickerName: "Ethereum on Base Sepolia",
};

export const scrollSepoliaConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x8274f",
  rpcTarget: "	https://sepolia-rpc.scroll.io/",
  displayName: "Scroll Sepolia",
  blockExplorerUrl: "https://sepolia.scrollscan.com",
  ticker: "ETH",
  tickerName: "Ethereum on Scroll Sepolia",
};

export const arbSepoliaConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x66eee",
  rpcTarget: "https://sepolia-rollup.arbitrum.io/rpc",
  displayName: "Arbitrum Sepolia",
  blockExplorerUrl: "https://sepolia-explorer.arbitrum.io",
  ticker: "ETH",
  tickerName: "Ethereum on Arbitrum Sepolia",
};

export const optimismSepoliaConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa37dc",
  rpcTarget: "https://sepolia.optimism.io",
  displayName: "Optimism Sepolia",
  blockExplorerUrl: "https://sepolia-optimism.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum on Optimism Sepolia",
};

export const ethereumSepoliaConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://eth-sepolia.g.alchemy.com/v2/demo",
  displayName: "Ethereum Sepolia",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum on Sepolia",
};
