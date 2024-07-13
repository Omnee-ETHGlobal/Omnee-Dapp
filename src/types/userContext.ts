// src/types/userContext.ts

export interface User {
  address: string;
  balance: string;
  loginMethod: string; 
}
  
  export interface UserContextType {
    user: User | null;
    loggedIn: boolean;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    getBalance: () => Promise<void>;
    switchChain: (id: any) => Promise<void>;
  }
  