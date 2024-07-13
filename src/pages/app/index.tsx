import { UniversalFactoryContract, web3Config } from "@/config";
import { useUser } from "@/context/web3UserContext";
import {
  getCurrentDeploy,
  getQuoteDeployOFT,
  useUniversalFactory,
} from "@/hooks/UniversalFactory/UniversalFactoryContract";

import Link from "next/link";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useWriteContract } from "wagmi";
import { BLOCKSCOUT_BASE_URL } from "@/config/api/blockscoutApi";
import { useGraphQLQuery } from "@/hooks/GraphQL/useGraphQlQuery";

const App: React.FC = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const [update, setUpdate] = useState(0);
  const [deployData, setDeployData] = useState({ name: "", symbol: "" });
  const [deploy, setDeploy] = useState(false);
  const { user } = useUser();
  const [currentDeploy, setCurrentDeploy] = useState<BigInt | null>(null);

  const [selectedChains, setSelectedChains] = useState<number[]>([]);
  const [deployLoading, setDeployLoading] = useState(false);
  const [informationsFromDeployResult, setInformationsFromDeployResult] =
    useState<any>(null);

  const estimateGasFees = async () => {
    if (!user?.address) return;
    try {
      const nativeFee = await getQuoteDeployOFT(
        deployData,
        selectedChains,
        `0x000301001101000000000000000000000000000f4240`
      );
      return nativeFee;
    } catch (e) {
      console.error("Error estimating gas fees:", e);
    }
  };

  const deployToUniversalFactory = async () => {
    if (!user || !user.address) return;
    setDeployLoading(true);

    try {
      const estimatedFee = await estimateGasFees();
      const tx = await writeContractAsync({
        ...UniversalFactoryContract,
        functionName: "deployOFT",
        args: [
          deployData.name,
          deployData.symbol,
          selectedChains,
          `0x000301001101000000000000000000000000000f4240`,
        ],
        value: estimatedFee,
      });

      const result = await waitForTransactionReceipt(web3Config as any, {
        hash: tx as any,
      });

      if (result.status === "success") {
        toast.success(
          <span>
            Deploy successful!{" "}
            <a
              href={`${BLOCKSCOUT_BASE_URL}${result.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Blockscout
            </a>
          </span>
        );
        setUpdate((prev) => prev + 1);
        setDeploy(true);
        setInformationsFromDeployResult(result);
      } else {
        toast.error("Error during transaction");
      }
    } catch (error) {
      console.error("Deployment Error:", error);
    } finally {
      setDeployLoading(false);
    }
  };

  const tweetDeploymentResult = (result: any) => {
    const tweetText = `I just deployed a new token thanks to @omneefun named ${deployData.name} with symbol ${deployData.symbol}! 
    Check out the transaction here: ${BLOCKSCOUT_BASE_URL}${result.transactionHash}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeployData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChainChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const chainId = parseInt(value);

    setSelectedChains((prev) =>
      checked ? [...prev, chainId] : prev.filter((id) => id !== chainId)
    );
  };

  useEffect(() => {
    const fetchCurrentDeploy = async () => {
      try {
        const deployId = await getCurrentDeploy();
        setCurrentDeploy(deployId);
      } catch (e) {
        console.error("Error fetching current deploy ID:", e);
      }
    };

    fetchCurrentDeploy();
  }, [update, deploy]);

  return (
    <div className="container">
      <h1 className="title text-center">Home Page</h1>
      <Link className="btn btn-primary" href="/app/123">
        Go to App Page with ID 123
      </Link>
      <div>
        <div>
          <h2>OFT DEPLOYÉ {currentDeploy ? currentDeploy.toString() : "-"}</h2>
        </div>
        <h2>Set Name and Symbol</h2>
        <div className="form-group">
          <label htmlFor="nameInput">Name:</label>
          <input
            type="text"
            id="nameInput"
            name="name"
            value={deployData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="symbolInput">Symbol:</label>
          <input
            type="text"
            id="symbolInput"
            name="symbol"
            value={deployData.symbol}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <h3>Select Chains</h3>
          <div>
            <input
              type="checkbox"
              id="baseSepolia"
              value="40170"
              checked
              disabled
              onChange={handleChainChange}
            />
            <label htmlFor="baseSepolia">Base Sepolia</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="scrollSepolia"
              value="40170"
              onChange={handleChainChange}
            />
            <label htmlFor="scrollSepolia">Scroll Sepolia</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="arbitrumSepolia"
              value="40231"
              onChange={handleChainChange}
            />
            <label htmlFor="arbitrumSepolia">Arbitrum Sepolia</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="optimismSepolia"
              value="40232"
              onChange={handleChainChange}
            />
            <label htmlFor="optimismSepolia">Optimism Sepolia</label>
          </div>
        </div>
        <button className="btn btn-primary" onClick={deployToUniversalFactory}>
          Deploy
        </button>
        {user?.loginMethod === "Twitter" && informationsFromDeployResult && (
          <button
            className="btn btn-primary"
            onClick={() => tweetDeploymentResult(informationsFromDeployResult)}
          >
            Share on Twitter
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
