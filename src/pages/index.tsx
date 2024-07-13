import LoginButton from "@/components/LoginButton/LoginButton";
import { useUser } from "@/context/web3UserContext";
import Link from "next/link";
import React, { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const { login, loggedIn, logout, user, switchChain, loading } = useUser();
  const [chain, setChain] = useState("1");
  const [update, setUpdate] = useState(0);
  const handleChainSwitch = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newChainId = event.target.value;
    setChain(newChainId);
    await switchChain(newChainId);
  };

  return (
    <div className="container">
      <h1 className="title text-center red-title">LANDING</h1>

      <LoginButton />
  
          {user?.loginMethod === "Metamask" && (
            <>
              <p>Logged in with MetaMask</p>
              <label htmlFor="chainSelect">Switch Network:</label>
              <select
                id="chainSelect"
                value={chain}
                onChange={handleChainSwitch}
              >
                <option value="1">Base Sepolia</option>
                <option value="2">Scroll Sepolia</option>
                <option value="3">Arbitrum Sepolia</option>
                <option value="4">Optimism Sepolia</option>
                <option value="5">Ethereum Sepolia</option>
              </select>
            </>
          )}
     

      <Link href="/app">Launch App</Link>
    </div>
  );
};

export default Home;
