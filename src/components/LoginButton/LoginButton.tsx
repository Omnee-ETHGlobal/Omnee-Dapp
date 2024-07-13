// src/components/LoginButton.tsx

import { useUser } from "@/context/web3UserContext";
import React from "react";


const LoginButton: React.FC = () => {
  const { user, loggedIn, login, logout } = useUser();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  return (
    <button onClick={loggedIn ? logout : login} className="card btn btn-primary">
      {loggedIn && user?.address ? formatAddress(user.address) : 'Login'}
    </button>
  );
};

export default LoginButton;
