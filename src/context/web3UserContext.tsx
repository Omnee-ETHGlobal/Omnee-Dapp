import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import { User, UserContextType } from "@/types/userContext";
import { web3auth } from "@/config/web3AuthConfig";
import { arbSepoliaConfig, baseSepoliaConfig, scrollSepoliaConfig } from "@/config/chainConfig";
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    initWeb3Auth();
  }, []);

  const initWeb3Auth = async () => {
    try {
      await web3auth.initModal({
        modalConfig: {
          openlogin: {
            label: "openlogin",
            loginMethods: {
              facebook: { name: "facebook", showOnModal: false },
              reddit: { name: "reddit", showOnModal: false },
              twitter: { name: "twitter", showOnModal: false },
              discord: { name: "discord", showOnModal: false },
              line: { name: "line", showOnModal: false },
              linkedin: { name: "linkedin", showOnModal: false },
              twitch: { name: "twitch", showOnModal: false },
              apple: { name: "apple", showOnModal: false },
              github: { name: "github", showOnModal: false },
              kakao: { name: "kakao", showOnModal: false },
              weibo: { name: "weibo", showOnModal: false },
              wechat: { name: "wechat", showOnModal: false },
              farcaster: { name: "farcaster", showOnModal: false },
              google: { name: "google", showOnModal: true },
              metamask: { name: "metamask", showOnModal: true },
            },
          },
        },
      });
    if (web3auth.connected) {
      try {
        setLoggedIn(true);
        const loginMethod = await determineLoginMethod();
        await updateUser(loginMethod);
      } catch (chainError) {
        console.error("Failed to add chain config:", chainError);
      }
    }
  } catch (error) {
    console.error("Initialization failed:", error);
  }
};


const determineLoginMethod = async () => {
    const userInfo = await web3auth.getUserInfo();
    console.log(userInfo);
  
    if (userInfo) {
      switch (userInfo.typeOfLogin) {
        case "google":
          return "Google";
        case "metamask":
          return "MetaMask";
        case "sms_passwordless":
          return "SMS";
        case "email_passwordless":
          return "Email";
        default:
          return "Unknown";
      }
    }
  
    return "Unknown";
  };
  
  

  const updateUser = async (loginMethod: string) => {
    try {
      const web3 = new Web3(web3auth.provider as any);
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) throw new Error("No accounts found");

      const address = accounts[0];
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address),
        "ether"
      );

      setUser({
        address,
        balance,
        loginMethod,
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const login = async () => {
    try {
      await web3auth.connect();
      setLoggedIn(true);
      const loginMethod = await determineLoginMethod();
      await updateUser(loginMethod);
    } catch (error) {
      console.error("Login failed:", error);
      setLoggedIn(false);
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
    const newBalance = web3.utils.fromWei(
      await web3.eth.getBalance(user.address),
      "ether"
    );
    setUser({ ...user, balance: newBalance });
  };
  const switchChain = async (id: string) => {
    try {
      switch (id) {
        case '1':
          await web3auth.addChain(baseSepoliaConfig);
          await web3auth.switchChain({ chainId: baseSepoliaConfig.chainId });
          break;
        case '2':
          await web3auth.addChain(scrollSepoliaConfig);
          await web3auth.switchChain({ chainId: scrollSepoliaConfig.chainId });
          break;
        case '3':
          await web3auth.addChain(arbSepoliaConfig);
          await web3auth.switchChain({ chainId: arbSepoliaConfig.chainId });
          break;
        default:
          await web3auth.addChain(baseSepoliaConfig);
          await web3auth.switchChain({ chainId: baseSepoliaConfig.chainId });
          break;
      }
      await getBalance();
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  };
  

  return (
    <UserContext.Provider
      value={{ user, loggedIn, login, logout, getBalance, switchChain }}
    >
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
