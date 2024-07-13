import { createConfig } from "wagmi";
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

export const UniversalFactoryContract = {
    address: "0xF803d75844195266E9a0Db97b17832Bb14F5Ca91",
    abi: UniversalFactoryABI as any,
  } as const;