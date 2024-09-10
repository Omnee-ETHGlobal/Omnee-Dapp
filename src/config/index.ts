import { createConfig } from "wagmi";
import UniversalFactoryABI from "../config/abi/universalfactory.json"
import BondingCurvABI from "../config/abi/bondingcurvfactory.json"
import { arbitrumSepolia, optimismSepolia, scrollSepolia, sepolia, zircuitTestnet } from "wagmi/chains";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const web3Config = createConfig({
  chains: [baseSepolia, scrollSepolia, arbitrumSepolia, optimismSepolia, zircuitTestnet],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/"),
    [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
    [optimismSepolia.id]: http("https://sepolia.optimism.io"),
    [zircuitTestnet.id]: http("https://zircuit-testnet.io"),
  },
});

export const projectId = '3af11aeb8fc536af01ca261026751c52'

export const web3ConfigRaimbow = getDefaultConfig({
  appName: "OmneeFun",
  projectId: "3af11aeb8fc536af01ca261026751c52",
  chains: [baseSepolia,scrollSepolia, scrollSepolia, arbitrumSepolia, optimismSepolia, zircuitTestnet],
  ssr: false,
});

export const BaseConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
});


export const UniversalFactoryContract = {
    address: "0xf46ac01917B5CbE6125aF8EA2aC9E85de0e365aA",
    abi: UniversalFactoryABI as any,
  } as const;

export const BondingCurveContract = {
    address: "0x7b7e9603b68ca1c0C975eD4594dF1Da29e603b6e",
    abi: BondingCurvABI as any,
  } as const;
