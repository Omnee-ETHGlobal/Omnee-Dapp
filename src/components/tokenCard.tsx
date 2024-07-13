import Link from 'next/link';
import React from 'react';

interface ChainLogos {
  [key: string]: string;
}

const CHAIN_LOGOS: ChainLogos = {
  "40245": "/images/chains/base.png",
  "40170": "/images/chains/scro.png",
  "40231": "/images/chains/arb.png",
  "40232": "/images/chains/op.png",
};

const TokenCard: React.FC<TokenProps> = ({ token }) => {
  const renderChainLogos = (chainIds: string[]) => {
    return chainIds.map(chainId => {
      const logoUrl = CHAIN_LOGOS[chainId];
      if (!logoUrl) {
        console.error(`Logo not found for chainId: ${chainId}`);
        return null;
      }
      return (
        <img key={chainId} className="chain-logo" src={logoUrl} alt={`${chainId} logo`} />
      );
    });
  };
  console.log(token);
  return (
    <div className="col-md-3">
      <Link className="text-decoration-none" href={`/app/${token.param0}`}>
        <div className="card-token">
          <div className="row d-flex align-items-center mb-5">
            <div className="col-3 text-start">
              <img className="token-picture" src="/images/tokenpicture.png" alt="Token Picture" />
            </div>
            <div className="col-9 text-end">
              {renderChainLogos(token.param3)}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-start">
              <h3 className="card-token-name mb-1">{token.param1}</h3>
              <h4 className="card-token-pair">{token.param2}/ETH</h4>
            </div>
            <div className="col-6 d-flex flex-column justify-content-end align-items-end">
              <h3 className="card-token-price">{token.param4} Ξ</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TokenCard;
