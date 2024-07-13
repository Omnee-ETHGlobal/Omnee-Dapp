import { BaseConfig, BondingCurveContract, web3Config } from "@/config";
import { multicall } from "wagmi/actions";


export const getTokenPrice = async (
    address: string ,
) => {
  const response = await multicall(BaseConfig, {
    contracts: [
      {
          ...BondingCurveContract,
          functionName: "getTokenPrice",
          args: [address],
        },
    ],
  });
  console.log(response);
  return response[0].result as bigint;
};
