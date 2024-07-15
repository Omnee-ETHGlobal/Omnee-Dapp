import { getTokenPrice } from "@/hooks/BondingCurvFactory/useBondingCurvContracts";
import { formatTokenPrice } from "@/utils/formatPrice";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ChainLogos {
  [key: string]: string;
}

const CHAIN_LOGOS: ChainLogos = {
  "40245": "/images/chains/base.png",
  "40170": "/images/chains/scro.png",
  "40231": "/images/chains/arb.png",
  "40232": "/images/chains/op.png",
  "48899": "/images/chains/zircuit.png",
};

const defaultLogoUrl = "/images/chains/base.png";

const TokenCard: React.FC<TokenProps> = ({ token }) => {
  const [tokenPrice, setTokenPrice] = useState<string | null>(null);
  const [getPrice, setGetPrice] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const priceInWei = await getTokenPrice(token.tokenAddress);
        const priceInEth = ethers.utils.formatEther(priceInWei);
        const formattedPrice = formatTokenPrice(priceInEth);
        setTokenPrice(formattedPrice);
      } catch (error) {
        console.error('Error fetching token price:', error);
        setTokenPrice('-');
      }
    };

    fetchPrice();
  }, [token.tokenAddress]);
  const renderChainLogos = (chainIds: string[]) => {
    const defaultLogoUrl = "/images/chains/base.png";
    return chainIds.map((chainId) => {
      const specificLogoUrl = CHAIN_LOGOS[chainId];
      return (
        <React.Fragment key={chainId}>
          {specificLogoUrl && (
            <img
              className="chain-logo"
              src={specificLogoUrl}
              alt={`${chainId} logo`}
            />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="col-md-3">
      <Link
        className="text-decoration-none"
        href={`/token/${token.tokenAddress}`}
      >
        <div className="card-token">
          <div className="row d-flex align-items-center mb-5">
            <div className="col-3 text-start">
              <img
                className="token-picture"
                src="/images/tokenpicture.png"
                alt="Token Picture"
              />
            </div>
            <div className="col-9 text-end">
            <img className="chain-logo" src={defaultLogoUrl} alt="Default logo" />
              {renderChainLogos(token.eids.map((eid) => eid.toString()))}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-start">
              <h3 className="card-token-name mb-1">{token.name}</h3>
              <h4 className="card-token-pair">{token.symbol}/ETH</h4>
            </div>
            <div className="col-6 d-flex flex-column justify-content-end align-items-end">
              <h3 className="card-token-price">{tokenPrice?.toString()} Ξ</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TokenCard;
