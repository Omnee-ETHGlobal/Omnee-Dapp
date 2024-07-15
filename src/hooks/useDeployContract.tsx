import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { UniversalFactoryContract, web3Config } from "@/config";
import { useUser } from "@/context/web3UserContext";
import { getQuoteDeployOFT } from "@/hooks/UniversalFactory/useUniversalFactoryContract";
import { useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { DeployData } from "@/types/deployData";

const useDeployByLoginMethod = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [deployLoading, setDeployLoading] = useState(false);

  const estimateGasFees = async (
    deployData: DeployData,
    selectedChains: number[]
  ) => {
    if (!isConnected) return;
    try {
      console.log("deployData", selectedChains);
      const nativeFee = await getQuoteDeployOFT(
        deployData,
        selectedChains,
        "0x000301001101000000000000000000000000000f4240"
      );
      console.log("nativeFee", nativeFee);
      return nativeFee;
    } catch (e) {
      console.error("Error estimating gas fees:", e);
    }
  };


  const deployToUniversalFactory = async (
    deployData: DeployData,
    selectedChains: number[]
  ) => {
    if (!isConnected) return;
    setDeployLoading(true);
    try {
      const estimatedFee = await estimateGasFees(deployData, selectedChains);
      const tx = await writeContractAsync({
        ...UniversalFactoryContract,
        functionName: "deployOFT",
        args: [
          deployData.name,
          deployData.symbol,
          selectedChains,
          "0x000301001101000000000000000000000000000f4240",
        ],
        value: estimatedFee,
      });

      const result = await waitForTransactionReceipt(web3Config as any, {
        hash: tx as any,
      });
      console.log("result", result);
      return result;
    } finally {
      setDeployLoading(false);
    }
  };


  return { deployToUniversalFactory, deployLoading, estimateGasFees };
};

export default useDeployByLoginMethod;
