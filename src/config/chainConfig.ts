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
