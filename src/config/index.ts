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
    address: "0x43487B3C75B511a19fb591bBB5dA1aAd454DC071",
    abi: UniversalFactoryABI as any,
  } as const;

export const BondingCurveContract = {
    address: "0xFC308527980c5800549053831C959F28d1bc4447",
    abi: BondingCurvABI as any,
  } as const;