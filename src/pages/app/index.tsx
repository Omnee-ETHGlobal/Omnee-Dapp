import { UniversalFactoryContract, web3Config } from "@/config";
import { useUser } from "@/context/web3UserContext";
import {
  getCurrentDeploy,
  getQuoteDeployOFT,
  useUniversalFactory,
} from "@/hooks/sc/UniversalFactoryContract";
import { useGraphQLQuery } from "@/hooks/useGraphQlQuery";
import { ethers } from "ethers";
import Link from "next/link";

import React, { ChangeEvent, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "viem/actions";
import { useWriteContract } from "wagmi";

const HomePage: React.FC = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const [update, setUpdate] = useState(0);
  const [deployData, setDeployData] = useState({ name: "", symbol: "" });
  const [deploy, setDeploy] = useState(false);
  const { user } = useUser();
  const [estimatedFee, setEstimatedFee] = useState<BigInt | null>(null);
  const [currentDeploy, setCurrentDeploy] = useState<BigInt | null>(null);
  const { data } = useGraphQLQuery();

  const estimateGasFees = async () => {
    if (!user?.address) return;

    try {
      const nativeFee = await getQuoteDeployOFT(
        deployData,
        [40170, 40231],
        `0x`
      );
      setEstimatedFee(nativeFee);
      console.log("Estimated native fee:", nativeFee.toString());
    } catch (e) {
      console.error("Error estimating gas fees:", e);
    }
  };

  const deployToUniversalFactory = async () => {
    if (!user) return;
    if (user.address) {
      setDeploy(true);
      try {
        const tx = await writeContractAsync({
          ...UniversalFactoryContract,
          functionName: "deployOFT",
          args: [deployData.name, deployData.symbol],
        });
        const result = await waitForTransactionReceipt(web3Config as any, {
          hash: tx as any,
        });

        if (result.status === "success") {
          setUpdate(update + 1);
          toast.success("Deploy successful");
        } else {
          toast.error("Error during transaction");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeployData((prev) => ({ ...prev, [name]: value }));
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
        <button className="btn btn-primary" onClick={deployToUniversalFactory}>
          Deployer
        </button>
        <p>Current deploy: {currentDeploy ? currentDeploy.toString() : "-"} </p>
      </div>
    </div>
  );
};

export default HomePage;
