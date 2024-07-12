import { useUser } from "@/context/web3UserContext";
import React, { useState, ChangeEvent } from "react";

const Home: React.FC = () => {
  const { login, loggedIn, logout, user, switchChain } = useUser();
  const [chain, setChain] = useState("1");

  const handleChainSwitch = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newChainId = event.target.value;
    setChain(newChainId);
    await switchChain(newChainId);
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to the Home Page</h1>
      {!loggedIn ? (
        <button onClick={login}>Login</button>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          {user?.loginMethod === "MetaMask" && (
            <>
              <p>Logged in with MetaMask</p>
              <label htmlFor="chainSelect">Switch Network:</label>
              <select id="chainSelect" value={chain} onChange={handleChainSwitch}>
                <option value="1">Base Sepolia</option>
                <option value="2">Scroll Sepolia</option>
                <option value="3">Arbitrum Sepolia</option>
              </select>
            </>
          )}
        </>
      )}
      {loggedIn && user?.loginMethod !== "MetaMask" && (
        <p>Logged in with Google</p>
      )}
     

    </div>
  );
};

export default Home;
