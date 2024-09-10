import { BaseConfig,  BondingCurveContract, web3Config } from "@/config";
import { multicall } from "wagmi/actions";
import { useState } from "react";
import { ethers } from "ethers";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useAccount, useWriteContract } from "wagmi";
import { toast } from "react-toastify";

export const getTokenPrice = async (address: string) => {
  const response = await multicall(BaseConfig, {
    contracts: [
      {
        ...BondingCurveContract,
        functionName: "getTokenPrice",
        args: [address],
      },
    ],
  });
  return response[0].result as bigint;
};

const useBondingContract = () => {
  const {address, isConnected} = useAccount();
  const [buyLoading, setBuyLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const [buyTokenLoading, setBuyTokenLoading] = useState(false);
  const [sellTokenLoading, setSellTokenLoading] = useState(false);


  const BuyTokenMetamask = async (buyAmount: number, tokenAddress: string) => {
    setBuyTokenLoading(true);
    try {
      const buyAmountInWei = ethers.utils.parseEther(buyAmount.toString()).toBigInt();
      
      const tx = await writeContractAsync({
        ...BondingCurveContract,
        functionName: "buyTokens",
        args: [tokenAddress],
        value: buyAmountInWei,
      });
  
      const result = await waitForTransactionReceipt(web3Config as any, {
        hash: tx as any,
      });
      console.log("result", result);
      return result;
    } finally {
      setBuyTokenLoading(false);
    }
  };
  

  const sellTokenMetamask = async (amountSell: number, tokenAddress: string): Promise<any> => {
    if (!isConnected) {
      throw new Error("User not authenticated or address not found");
    }
    const buyAmountInWei = ethers.utils.parseEther(amountSell.toString()).toBigInt();
    setSellTokenLoading(true);
    try {
      const tx = await writeContractAsync({
        address: BondingCurveContract.address,
        abi: BondingCurveContract.abi,
        functionName: "sellTokens",
        args: [tokenAddress, buyAmountInWei], 
      });
  
      console.log("Transaction hash:", tx);
  
      const result = await waitForTransactionReceipt(web3Config as any, {
        hash: tx as any,
      });
  
      console.log("Sell result", result);
      return result;
    } catch (error) {
      console.error("Sell error", error);
      toast.error("Sell failed");
      throw error;
    } finally {
      setSellTokenLoading(false);
    }
  };
  


  return { buyLoading, sellTokenMetamask, sellTokenLoading, BuyTokenMetamask };
};

export default useBondingContract;
