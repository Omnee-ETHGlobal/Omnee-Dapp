interface TokenData {
    id: string;
    transactionHash: string;
    param0: string;
    param1: string;  
    param2: string;  
    param3: string[];  
    param4: string;  
  }
  
  interface TokenProps {
    token: TokenData;
  }
  