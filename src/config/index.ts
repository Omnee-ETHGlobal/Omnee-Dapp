import { createConfig } from "wagmi";
import UniversalFactoryABI from "../config/abi/universalfactory.json"
import BondingCurvABI from "../config/abi/bondingcurvfactory.json"
import { arbitrumSepolia, baseSepolia, optimismSepolia, scrollSepolia, sepolia } from "wagmi/chains";
import { http } from "viem";

export const web3Config = createConfig({
  chains: [sepolia, baseSepolia, scrollSepolia, arbitrumSepolia, optimismSepolia],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/demo"),
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/"),
    [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
    [optimismSepolia.id]: http("https://sepolia.optimism.io"),
  },
});

export const BaseConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
});

export const UniversalFactoryContract = {
    address: "0x435af5A68b47003f46078a105e2eFA2566e2680C",
    abi: UniversalFactoryABI as any,
  } as const;

export const BondingCurveContract = {
    address: "0x38f7f6eac9191BB1434587e7aE28b03ba17fe670",
    abi: BondingCurvABI as any,
  } as const;

