
import { getTokenPrice } from "@/hooks/BondingCurvFactory/useBondingCurvContracts";
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
};

const defaultLogoUrl = '/images/chains/base.png';

const TokenCard: React.FC<TokenProps> = ({ token }) => {
  const [tokenPrice, setTokenPrice] =useState<BigInt | null>(null);
  const [getPrice, setGetPrice] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  useEffect(() => {
    const fetchCurrentDeploy = async () => {
      try {
        setGetPrice(true);
        console.log(token.param0);
        const price = await getTokenPrice(token.param0);
        setTokenPrice(price);
      } catch (e) {
        console.error("Error fetching current deploy ID:", e);
      } finally {
        setPriceLoading(false);
      }
    };
    fetchCurrentDeploy();
  }, []);
  const renderChainLogos = (chainIds: string[]) => {
    const defaultLogoUrl = "/images/chains/base.png";  

    return chainIds.map((chainId) => {
        const specificLogoUrl = CHAIN_LOGOS[chainId];

        return (
            <React.Fragment key={chainId}>
                <img
                    className="chain-logo"
                    src={defaultLogoUrl}
                    alt="Default logo"
                />
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
      <Link className="text-decoration-none" href={`/token/${token.param0}`}>
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
              {renderChainLogos(token.param3)}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-start">
              <h3 className="card-token-name mb-1">{token.param1}</h3>
              <h4 className="card-token-pair">{token.param2}/ETH</h4>
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
