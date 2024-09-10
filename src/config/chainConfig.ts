import { Chain } from "@/types/chain";

export const chainsData: { [key: string]: Chain } = {
  Arbitrum: { id: 40231, name: "Arbitrum", logo: "/images/chains/arb.png" },
  Optimism: { id: 40232, name: "Optimism", logo: "/images/chains/op.png" },
  Scroll: { id: 40170, name: "Scroll", logo: "/images/chains/scro.png" },
  Zircuit: { id: 40275, name: "Zircuit", logo: "/images/chains/zircuit.png" },
};
