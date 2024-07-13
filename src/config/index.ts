import { createConfig } from "wagmi";
import OftFactoryABI from "../config/abi/OFTFACTORY.json"
import UniversalFactoryABI from "../config/abi/universalfactory.json"
import { arbitrumSepolia, baseSepolia, optimismSepolia, scrollSepolia, sepolia } from "wagmi/chains";
import { createClient, http } from "viem";

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

export const OftFactoryContract = {
    address: "0x2d2dffeD3Ca547739EE4f835ee8674DE408b9598",
    abi: OftFactoryABI as any,
  } as const;

export const UniversalFactoryContract = {
    address: "0xfB9cDefA6Db1990dbC01225311f4f8A980EbDCEB",
    abi: UniversalFactoryABI as any,
  } as const;