import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { UniversalFactoryContract, web3Config } from "@/config";
import { useUser } from "@/context/web3UserContext";
import { getQuoteDeployOFT } from "@/hooks/UniversalFactory/useUniversalFactoryContract";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { DeployData } from "@/types/deployData";

const useDeployByLoginMethod = () => {
  const { user, ethersSigner } = useUser();
  const { writeContractAsync } = useWriteContract();
  const [deployLoading, setDeployLoading] = useState(false);

  const estimateGasFees = async (
    deployData: DeployData,
    selectedChains: number[]
  ) => {
    if (!user?.address) return;
    try {
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

  const deployToUniversalFactoryEthers = async (
    deployData: DeployData,
    selectedChains: number[]
  ) => {
    if (ethersSigner) {
      const universalFactorySC = new ethers.Contract(
        UniversalFactoryContract.address,
        UniversalFactoryContract.abi,
        ethersSigner
      );
      const estimatedFee = await estimateGasFees(deployData, selectedChains);

      const tx = await universalFactorySC.deployOFT(
        deployData.name,
        deployData.symbol,
        selectedChains,
        "0x000301001101000000000000000000000000000f4240",
        { value: estimatedFee }
      );

      const result = await tx.wait();
      return result;
    } else {
      throw new Error("Ethers signer not available");
    }
  };

  const deployToUniversalFactory = async (
    deployData: DeployData,
    selectedChains: number[]
  ) => {
    if (!user || !user.address)
      throw new Error("User not authenticated or address not found");
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

  const deployByLoginMethod = useCallback(
    async (deployData: any, selectedChains: any) => {
      setDeployLoading(true);
      try {
        const result =
          user?.loginMethod === "Google"
            ? await deployToUniversalFactoryEthers(deployData, selectedChains)
            : await deployToUniversalFactory(deployData, selectedChains);

        return result;
      } catch (error) {
        return error;
      } finally {
        setDeployLoading(false);
      }
    },
    [user?.loginMethod, ethersSigner]
  );

  return { deployByLoginMethod, deployLoading };
};

export default useDeployByLoginMethod;
