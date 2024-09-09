import { useEffect, useState } from "react";
import { UniversalFactoryContract, web3Config } from "@/config";
import { getQuoteDeployOFT } from "@/hooks/UniversalFactory/useUniversalFactoryContract";
import { useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { DeployData } from "@/types/deployData";

const useDeployByLoginMethod = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [deployLoading, setDeployLoading] = useState(false);

  // Fonction pour estimer les frais de gas
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
        "0x000301001101000000000000000000000000000f4240" // Exemple de valeur d'argument
      );
      console.log("nativeFee", nativeFee);
      return nativeFee;
    } catch (e) {
      console.error("Error estimating gas fees:", e);
    }
  };


  // Fonction pour déployer le contrat via UniversalFactory
  const deployToUniversalFactory = async (
    deployData: DeployData,
    selectedChains: number[]
  ) => {
    if (!isConnected) return;
    setDeployLoading(true);

    try {
      // Appel de l'estimation des frais
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

  useEffect(() => {
    console.log("deploy loading" + deployLoading);
  }, [deployLoading]);

  // Retour des fonctions et variables utiles du hook
  return {
    deployToUniversalFactory,
    deployLoading,
    estimateGasFees,
  };
};

export default useDeployByLoginMethod;
