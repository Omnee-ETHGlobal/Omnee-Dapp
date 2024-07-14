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
  