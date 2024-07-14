import { BaseConfig, BondingCurveContract, web3Config } from "@/config";
import { multicall } from "wagmi/actions";
import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { useUser } from "@/context/web3UserContext";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useWriteContract } from "wagmi";

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
  const { ethersSigner, user } = useUser();
  const [buyLoading, setBuyLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const [buyTokenLoading, setBuyTokenLoading] = useState(false);
  const [sellTokenLoading, setSellTokenLoading] = useState(false);

  const BuyTokenGoogle = async (buyAmount: number, tokenAddress: string) => {
    if (!ethersSigner) {
      throw new Error("Ethers signer not available");
    }

    try {
      setBuyLoading(true);

      const BondingCurveFactorySC = new ethers.Contract(
        BondingCurveContract.address,
        BondingCurveContract.abi,
        ethersSigner
      );

      const tx = await BondingCurveFactorySC.buyTokens(tokenAddress, {
        value: ethers.utils.parseEther(buyAmount.toString()),
      });
      const result = await tx.wait();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Failed to buy tokens");
      throw error;
    } finally {
      setBuyLoading(false);
    }
  };

  const BuyTokenMetamask = async (buyAmount: number, tokenAddress: string) => {
    if (!user || !user.address)
      throw new Error("User not authenticated or address not found");
    setBuyTokenLoading(true);
    try {
      const tx = await writeContractAsync({
        ...BondingCurveContract,
        functionName: "buyTokens",
        args: [tokenAddress],
        value: BigInt(buyAmount),
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

  const BuyTokens = useCallback(
    async (buyAmount: number, tokenAddress: string) => {
      setBuyTokenLoading(true);
      try {
        const result =
          user?.loginMethod === "Google"
            ? await BuyTokenGoogle(buyAmount, tokenAddress)
            : await BuyTokenMetamask(buyAmount, tokenAddress);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        setBuyTokenLoading(false);
      }
    },
    [user?.loginMethod, ethersSigner]
  );

  const SellTokenGoogle = async (buyAmount: number, tokenAddress: string) => {
    if (!ethersSigner) {
      throw new Error("Ethers signer not available");
    }

    try {
      setBuyLoading(true);

      const BondingCurveFactorySC = new ethers.Contract(
        BondingCurveContract.address,
        BondingCurveContract.abi,
        ethersSigner
      );

      const tx = await BondingCurveFactorySC.sellTokens(tokenAddress, {
        value: ethers.utils.parseEther(buyAmount.toString()),
      });
      const result = await tx.wait();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Failed to sell tokens");
      throw error;
    } finally {
      setBuyLoading(false);
    }
  };

  const sellTokenMetamask = async (buyAmount: number, tokenAddress: string) => {
    if (!user || !user.address)
      throw new Error("User not authenticated or address not found");
    setBuyTokenLoading(true);
    try {
      const tx = await writeContractAsync({
        ...BondingCurveContract,
        functionName: "sellTokens",
        args: [tokenAddress],
        value: BigInt(buyAmount),
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

  const SellTokens = useCallback(
    async (buyAmount: number, tokenAddress: string) => {
      setBuyTokenLoading(true);
      try {
        const result =
          user?.loginMethod === "Google"
            ? await SellTokenGoogle(buyAmount, tokenAddress)
            : await sellTokenMetamask(buyAmount, tokenAddress);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        setSellTokenLoading(false);
      }
    },
    [user?.loginMethod, ethersSigner]
  );

  return { BuyTokens, buyLoading, SellTokens, sellTokenLoading };
};

export default useBondingContract;
