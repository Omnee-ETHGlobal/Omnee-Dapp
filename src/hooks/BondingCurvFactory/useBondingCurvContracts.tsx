import { BaseConfig, BondingCurveContract, web3Config } from "@/config";
import { multicall } from "wagmi/actions";
import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { useUser } from "@/context/web3UserContext";
import { waitForTransactionReceipt } from "@wagmi/core";
import { DeployData } from "@/types/deployData";
import { useWriteContract } from "wagmi";

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


const useBondingContract = () => {
  const { user, ethersSigner } = useUser();
  const [buyLoading, setBuyLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const BuyTokenGoogle = async (
    buyAmount: number,
    address: string,
  ) => {
    if (ethersSigner) {
      const BondingCurvFactorySC = new ethers.Contract(
        BondingCurveContract.address,
        BondingCurveContract.abi,
        ethersSigner
      );

      const tx = await BondingCurvFactorySC.buyTokens(
        buyAmount,
          address
      );
      const result = await tx.wait(); 
      console.log(result);
      return result;
    } else {
      throw new Error("Ethers signer not available");
    }
  };


  return { BuyTokenGoogle, buyLoading };
};

export default useBondingContract;
