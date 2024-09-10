import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ERC20_ABI from "@/config/abi/erc20.json";
import { useUser } from "@/context/web3UserContext";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useWriteContract } from "wagmi";
import { web3Config } from "@/config";
import { toast } from "react-toastify";

const useToken = (tokenAdress: `0x${string}`) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [deployLoading, setDeployLoading] = useState(false);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const [approved, setApproved] = useState<boolean>(false);
  const { writeContractAsync } = useWriteContract();

  const approveMetamask = async (spender: string, amount: number) => {
    setDeployLoading(true);
    try {
      const amountInWei = ethers.utils.parseUnits(amount.toString(), "ether");
      console.log("montant approve",ethers.utils.parseUnits(amount.toString()));
      const tx = await writeContractAsync({
        address: tokenAdress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [spender, amountInWei],
      });
      return tx;
    } catch (error) {
      console.error("Approval failed", error);
      toast.error("Approval failed");
      return null; 
    } finally {
      setDeployLoading(false);
    }
  };
  

  return {
    contract,
    deployedAddress,
    deployLoading,
    approvalLoading,
    error,
    approveMetamask,
  };
};

export default useToken;
