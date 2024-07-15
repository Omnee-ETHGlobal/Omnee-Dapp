interface TokenData {
  id: string;
  tokenAddress: string;
  name: string;
  symbol: string;
  eids: BigInt[];
  deployId: BigInt;
  blockNumber: BigInt;
  blockTimestamp: BigInt;
  transactionHash: string;
  }
  
  interface TokenProps {
    token: TokenData;
  }
  
  interface TokenDataForUniversalFactory {
    0: BigInt;
    1: string;
    2: string;
    3: string;
  }
  
  interface SuccessResult {
    result: TokenDataForUniversalFactory;
    status: "success";
  }
  
  interface FailureResult {
    error: Error;
    status: "failure";
  }
  
  type MulticallResult = SuccessResult | FailureResult;
  

  
  