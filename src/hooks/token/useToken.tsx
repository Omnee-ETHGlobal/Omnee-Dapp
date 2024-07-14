import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ERC20_ABI from "@/config/abi/erc20.json";
import { useUser } from "@/context/web3UserContext";
import { waitForTransactionReceipt } from "viem/actions";
import { useWriteContract } from "wagmi";
import { web3Config } from "@/config";
import { toast } from "react-toastify";


const useToken = (tokenAdress: `0x${string}`) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [deployLoading, setDeployLoading] = useState(false);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, ethersSigner } = useUser();
  const [approved, setApproved] = useState<boolean>(false);
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (!tokenAdress) return;
    const initializeContract = async () => {
      try {
        const tokenContract = new ethers.Contract(
          tokenAdress,
          ERC20_ABI,
          ethersSigner
        );
        setContract(tokenContract);
      } catch (err) {
        setError("Failed to initialize contract");
        console.error(err);
      }
    };
    initializeContract();
  }, [tokenAdress]);

  const approveMetamask = async (spender: string, amount: ethers.BigNumberish) => {
    if (!user || !user.address) {
      throw new Error("User not authenticated or address not found");
    }
    
    setDeployLoading(true);
    try {

      const tx = await writeContractAsync({
        address: tokenAdress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [spender, amount],
      });
  
      const result = await waitForTransactionReceipt(web3Config as any, {
        hash: tx as any,
      });
  
      console.log("Approval result", result);
      return result;
    } catch (error) {
      toast.error("Approval failed");
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
