import { useEffect, useState } from "react";
import { multicall } from "@wagmi/core";
import { UniversalFactoryContract, web3Config } from "@/config";

export const useUniversalFactory = (
  account: `0x${string}` | null,
  refresh: any,
  update: any,
) => {
  const [data, setData] = useState({
    currentDeploy: BigInt(0),
  });

  //useEffect(() => {
    const fetch = async () => {
      const res = await multicall(web3Config, {
        contracts: [
          {
            ...UniversalFactoryContract,
            functionName: "currentDeployId",
            args: [],
          },
        ],
      });

      console.log(res);
      setData({
        currentDeploy: res[0].result as bigint,
      });
    };

    if (account) fetch();
  //}, [account, refresh, update]);
  

  return data;
};

export const getQuoteDeployOFT = async (
    deployData: { name: string; symbol: string },
    eids: number[],
    options: string
  ) => {
    const response = await multicall(web3Config, {
      contracts: [
        {
          ...UniversalFactoryContract,
          functionName: "quoteDeployOFT",
          args: [deployData.name, deployData.symbol, eids, options],
        },
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
