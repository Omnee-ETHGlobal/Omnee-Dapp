import { createConfig } from "wagmi";
import UniversalFactoryABI from "../config/abi/universalfactory.json"
import BondingCurvABI from "../config/abi/bondingcurvfactory.json"
import { arbitrumSepolia, baseSepolia, optimismSepolia, scrollSepolia, sepolia, zircuitTestnet } from "wagmi/chains";
import { http } from "viem";

export const web3Config = createConfig({
  chains: [sepolia, baseSepolia, scrollSepolia, arbitrumSepolia, optimismSepolia, zircuitTestnet],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/demo"),
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/"),
    [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
    [optimismSepolia.id]: http("https://sepolia.optimism.io"),
    [zircuitTestnet.id]: http("https://zircuit-testnet.io"),
  },
});

export const BaseConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
});

export const UniversalFactoryContract = {
    address: "0xdEa3d35De2FfD8183aF4569474e7635B037F86E4",
    abi: UniversalFactoryABI as any,
  } as const;

export const BondingCurveContract = {
    address: "0xbe61660C74e330E061F3e298020A675078Dc1fA3",
    abi: BondingCurvABI as any,
  } as const;
