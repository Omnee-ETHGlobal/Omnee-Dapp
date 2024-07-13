import { useEffect, useState } from "react";
import EthImage from "../../../public/images/eth.png";
import { getCurrentDeploy } from "@/hooks/UniversalFactory/UniversalFactoryContract";

const Home: React.FC = () => {
  const [update, setUpdate] = useState(0);
  const [deploy, setDeploy] = useState(false);
  const [currentDeploy, setCurrentDeploy] = useState<BigInt | null>(null);
  useEffect(() => {
    const fetchCurrentDeploy = async () => {
      try {
        const deployId = await getCurrentDeploy();
        setCurrentDeploy(deployId);
      } catch (e) {
        console.error("Error fetching current deploy ID:", e);
      }
    };

    fetchCurrentDeploy();
  }, [update, deploy]);
  return (
    <>
      {/*NAV DESKTOP*/}
      <div
        className="container-nav fixed-top d-none d-lg-block"
        style={{ top: 20 }}
      >
        <div className="navbarz" style={{ transition: "top 0.3s" }}>
          <div className="row align-items-center">
            <div className="col-3">
              <a href="index.html">
                <img src="./images/logo.svg" width="110px" alt="" />
              </a>
            </div>
            <div className="col-6 text-center">
              <a className="simple-link regular-text m-2" href="payin.html">
                Pay-in
              </a>
              <a className="simple-link regular-text m-2" href="payout.html">
                Pay-out
              </a>
              <a
                className="simple-link regular-text m-2"
                href="smartsettlement.html"
              >
                Smart Settlement
              </a>
              <a
                className="simple-link regular-text m-2"
                href="telegramandton.html"
              >
                Telegram &amp; TON
              </a>
              <a className="simple-link regular-text m-2" href="#">
                Documentation
              </a>
            </div>
            <div className="col-3 text-end">
              <a href="#" className="primary-btn-white-xsmall">
                Log in
              </a>
              <a href="#" className="primary-btn-xsmall">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*NAV MOBILE*/}
      <div
        className="container-nav navscroll fixed-top d-block d-lg-none"
        style={{ top: 10 }}
      >
        <div
          className="navbarz-mobile"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            padding: "15px 10px",
            borderRadius: 10,
          }}
        >
          <div className="row">
            <div className="col-4">
              <img src="./images/logo.svg" alt="" width="120px" />
            </div>
            <div className="col-8 text-end">
              <a className="primary-btn-xsmall" href="">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-hero">
        <div className="container-o text-center">
          {/*Title block*/}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 text-center">
              <span className="pill-step mb-3">
                {currentDeploy ? currentDeploy.toString() : "-"} tokens
              </span>
              <h1 className="hero-title">Discover all tokens</h1>
              <p className="hero-subtitle">Choose, Take a look, invest</p>
            </div>
          </div>
          {/*Title block*/}
          {/*Card block*/}
          <div className="row gx-3">
       {/*One card*/}
  <div className="col-md-3">
    <a className="text-decoration-none" href="">
      <div className="card-token">
        <div className="row d-flex align-items-center mb-5">
          <div className="col-3 text-start">
            <img
              className="token-picture"
              src="./images/tokenpicture.png"
              alt="Token Picture"
            />
          </div>
          <div className="col-9 text-end">
            <img className="chain-logo" src="./images/chains/arb.png" alt="" />
            <img className="chain-logo" src="./images/chains/eth.png" alt="" />
            <img className="chain-logo" src="./images/chains/op.png" alt="" />
            <img className="chain-logo" src="./images/chains/scro.png" alt="" />
            <img className="chain-logo" src="./images/chains/base.png" alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-start">
            <h3 className="card-token-name mb-1">Manrope</h3>
            <h4 className="card-token-pair">DOGE/ETH</h4>
          </div>
          <div className="col-6 d-flex flex-column justify-content-end align-items-end">
            <h3 className="card-token-price">0.0001 Ξ</h3>
          </div>
        </div>
      </div>
    </a>
  </div>
            {/*One card*/}
            <div className="col-md-3">
              <div className="card-token">
                <div className="row d-flex align-items-center mb-5">
                  <div className="col-3 text-start">
                    <img
                      className="token-picture"
                      src="./images/tokenpicture.png"
                      alt="Token Picture"
                    />
                    <img
                      className="eth-icon"
                      src="./images/eth.png"
                      alt="ETH Icon"
                    />
                  </div>
                  <div className="col-9 text-end">
                    <img
                      className="chain-logo"
                      src="./images/chains/arb.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/eth.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/op.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/scro.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/base.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 className="card-token-name mb-1">Manrope</h3>
                    <h4 className="card-token-pair">DOGE/ETH</h4>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                    <h3 className="card-token-price">0.0001 Ξ</h3>
                  </div>
                </div>
              </div>
            </div>
            {/*One card*/}
            <div className="col-md-3">
              <div className="card-token">
                <div className="row d-flex align-items-center mb-5">
                  <div className="col-3 text-start">
                    <img
                      className="token-picture"
                      src="./images/tokenpicture.png"
                      alt="Token Picture"
                    />
                    <img
                      className="eth-icon"
                      src="./images/eth.png"
                      alt="ETH Icon"
                    />
                  </div>
                  <div className="col-9 text-end">
                    <img
                      className="chain-logo"
                      src="./images/chains/arb.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/eth.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/op.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/scro.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/base.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 className="card-token-name mb-1">Manrope</h3>
                    <h4 className="card-token-pair">DOGE/ETH</h4>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                    <h3 className="card-token-price">0.0001 Ξ</h3>
                  </div>
                </div>
              </div>
            </div>
            {/*One card*/}
            <div className="col-md-3">
              <div className="card-token">
                <div className="row d-flex align-items-center mb-5">
                  <div className="col-3 text-start">
                    <img
                      className="token-picture"
                      src="./images/tokenpicture.png"
                      alt="Token Picture"
                    />
                    <img
                      className="eth-icon"
                      src="./images/eth.png"
                      alt="ETH Icon"
                    />
                  </div>
                  <div className="col-9 text-end">
                    <img
                      className="chain-logo"
                      src="./images/chains/arb.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/eth.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/op.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/scro.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/base.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 className="card-token-name mb-1">Manrope</h3>
                    <h4 className="card-token-pair">DOGE/ETH</h4>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                    <h3 className="card-token-price">0.0001 Ξ</h3>
                  </div>
                </div>
              </div>
            </div>
            {/*One card*/}
            <div className="col-md-3">
              <div className="card-token">
                <div className="row d-flex align-items-center mb-5">
                  <div className="col-3 text-start">
                    <img
                      className="token-picture"
                      src="./images/tokenpicture.png"
                      alt="Token Picture"
                    />
                    <img
                      className="eth-icon"
                      src="./images/eth.png"
                      alt="ETH Icon"
                    />
                  </div>
                  <div className="col-9 text-end">
                    <img
                      className="chain-logo"
                      src="./images/chains/arb.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/eth.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/op.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/scro.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/base.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 className="card-token-name mb-1">Manrope</h3>
                    <h4 className="card-token-pair">DOGE/ETH</h4>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                    <h3 className="card-token-price">0.0001 Ξ</h3>
                  </div>
                </div>
              </div>
            </div>
            {/*One card*/}
            <div className="col-md-3">
              <div className="card-token">
                <div className="row d-flex align-items-center mb-5">
                  <div className="col-3 text-start">
                    <img
                      className="token-picture"
                      src="./images/tokenpicture.png"
                      alt="Token Picture"
                    />
                    <img
                      className="eth-icon"
                      src="./images/eth.png"
                      alt="ETH Icon"
                    />
                  </div>
                  <div className="col-9 text-end">
                    <img
                      className="chain-logo"
                      src="./images/chains/arb.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/eth.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/op.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/scro.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/base.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 className="card-token-name mb-1">Manrope</h3>
                    <h4 className="card-token-pair">DOGE/ETH</h4>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                    <h3 className="card-token-price">0.0001 Ξ</h3>
                  </div>
                </div>
              </div>
            </div>
            {/*One card*/}
            <div className="col-md-3">
              <div className="card-token">
                <div className="row d-flex align-items-center mb-5">
                  <div className="col-3 text-start">
                    <img
                      className="token-picture"
                      src="./images/tokenpicture.png"
                      alt="Token Picture"
                    />
                    <img
                      className="eth-icon"
                      src="./images/eth.png"
                      alt="ETH Icon"
                    />
                  </div>
                  <div className="col-9 text-end">
                    <img
                      className="chain-logo"
                      src="./images/chains/arb.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/eth.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/op.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/scro.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/base.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 className="card-token-name mb-1">Manrope</h3>
                    <h4 className="card-token-pair">DOGE/ETH</h4>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                    <h3 className="card-token-price">0.0001 Ξ</h3>
                  </div>
                </div>
              </div>
            </div>
            {/*One card*/}
            <div className="col-md-3">
              <div className="card-token">
                <div className="row d-flex align-items-center mb-5">
                  <div className="col-3 text-start">
                    <img
                      className="token-picture"
                      src="./images/tokenpicture.png"
                      alt="Token Picture"
                    />
                    <img
                      className="eth-icon"
                      src="./images/eth.png"
                      alt="ETH Icon"
                    />
                  </div>
                  <div className="col-9 text-end">
                    <img
                      className="chain-logo"
                      src="./images/chains/arb.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/eth.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/op.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/scro.png"
                      alt=""
                    />
                    <img
                      className="chain-logo"
                      src="./images/chains/base.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 className="card-token-name mb-1">Manrope</h3>
                    <h4 className="card-token-pair">DOGE/ETH</h4>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-end align-items-end">
                    <h3 className="card-token-price">0.0001 Ξ</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
