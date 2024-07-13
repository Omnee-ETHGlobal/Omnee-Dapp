import { UniversalFactoryContract, web3Config } from "@/config";
import { useUser } from "@/context/web3UserContext";
import {
  getCurrentDeploy,
  getQuoteDeployOFT,
  useUniversalFactory,
} from "@/hooks/UniversalFactory/useUniversalFactoryContract";

import Link from "next/link";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useWriteContract } from "wagmi";
import { BLOCKSCOUT_BASE_URL } from "@/config/api/blockscoutApi";
import { ethers } from "ethers";
import useDeployByLoginMethod from "@/hooks/useDeployContract";
import { DeployData } from "@/types/deployData";

const App: React.FC = () => {
  const { deployByLoginMethod, deployLoading } = useDeployByLoginMethod();
  const { writeContractAsync, data: hash } = useWriteContract();
  const [update, setUpdate] = useState(0);
  const [deployData, setDeployData] = useState<DeployData>({ name: "", symbol: "" });
  const [deploy, setDeploy] = useState(false);
  const [currentDeploy, setCurrentDeploy] = useState<BigInt | null>(null);
  const [selectedChains, setSelectedChains] = useState<number[]>([]);

  const handleDeployClick = async () => {
    try {
      console.log("data" + deployData, selectedChains);
      const result = await deployByLoginMethod(deployData, selectedChains);
      console.log("result", result);
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
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      toast.error(`Deploy failed: ${error}`);
    }
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
      <Link className="btn btn-primary" href="/">
        back
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
              value="40245"
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
        <button onClick={handleDeployClick} disabled={deployLoading}>
          Deploy Contract
        </button>
      </div>
    </div>
  );
};

export default App;
