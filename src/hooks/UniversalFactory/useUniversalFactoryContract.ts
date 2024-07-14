import { useEffect, useState } from "react";
import { multicall } from "@wagmi/core";
import { UniversalFactoryContract, web3Config } from "@/config";

export const useUniversalFactory = (
  account: `0x${string}` | null,
  refresh: any,
  update: any,
  tokenId: string
) => {
  const [data, setData] = useState({
    tokenDeploy: BigInt(0),
  });

useEffect(() => {
    const fetch = async () => {
      const res = await multicall(web3Config, {
        contracts: [
          {
            ...UniversalFactoryContract,
            functionName: "tokenByAddress",
            args: [tokenId],
          },
        ],
      });
      setData({
        tokenDeploy: res[0].result as any,
      });
      console.log(res);
    };
    if (account) fetch();
}, [account, refresh, update]);
  return data;
};

export const getQuoteDeployOFT = async (
    deployData: { name: string; symbol: string },
    eids: number[],
    options: string,
  ) => {
    const response = await multicall(web3Config, {
      contracts: [
        {
          ...UniversalFactoryContract,
          functionName: "quoteDeployOFT",
          args: [deployData.name, deployData.symbol, eids, options],
        }
      ],
    });
  
    return response[0].result as bigint;
  };

  export const getCurrentDeploy = async (
  ) => {
    const response = await multicall(web3Config, {
      contracts: [
        {
            ...UniversalFactoryContract,
            functionName: "currentDeployId",
            args: [],
          },
      ],
    });
    return response[0].result as bigint;
  };
