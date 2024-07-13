import { UniversalFactoryContract, web3Config } from "@/config";
import { useUser } from "@/context/web3UserContext";
import Link from "next/link";
import React, { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "viem/actions";
import { useWriteContract } from "wagmi";

const Home: React.FC = () => {
  const { login, loggedIn, logout, user, switchChain, loading } = useUser();
  const [chain, setChain] = useState("1");
  const [update, setUpdate] = useState(0);
  const handleChainSwitch = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newChainId = event.target.value;
    setChain(newChainId);
    await switchChain(newChainId);
  };

  const notify = () => {
    toast.success('Success Notification');
  };

 return (
  <div className="container">
  <h1 className="title text-center red-title">Welcome to the Home Page</h1>
  {!loggedIn ? (
    <button className="btn btn-primary" onClick={login} disabled={loading}>
      {loading ? "Loading..." : "Login"}
    </button>
  ) : (
    <>
      <button className="btn btn-primary" onClick={logout} disabled={loading}>
        {loading ? "Loading..." : "Logout"}
      </button>
      {user?.loginMethod === "MetaMask" && (
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
    </>
  )}
   <button onClick={notify}>Show Success Toast</button>
  <Link href="/app">Launch App</Link>
</div>
);
};

export default Home;
