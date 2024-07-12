// src/context/UserProvider.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";

import { web3auth } from "@/config/web3AuthConfig";
import { User, UserContextType } from "@/types/userContext";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal({});

        if (web3auth.connected) {
          setLoggedIn(true);
          await updateUser();
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const updateUser = async () => {
    const userInfo = await web3auth.getUserInfo();
    const web3 = new Web3(web3auth.provider as any);
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address),
      "ether"
    );

    setUser({
      address,
      balance,
    });
  };

  const login = async () => {
    try {
      await web3auth.connect();
      setLoggedIn(true);
      await updateUser();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getBalance = async () => {
    if (!user) {
      console.log("User not initialized yet");
      return;
    }
    const web3 = new Web3(web3auth.provider as any);
    const address = user.address;
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address),
      "ether"
    );
    setUser({
      ...user,
      balance,
    });
    console.log(balance);
  };

  return (
    <UserContext.Provider value={{ user, loggedIn, login, logout, getBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
