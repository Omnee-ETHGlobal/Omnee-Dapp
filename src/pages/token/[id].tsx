// pages/app/[id].tsx

import Navbar from "@/components/navbar/navbar";
import { BLOCKSCOUT_BASE_URL } from "@/config/api/blockscoutApi";
import { useUser } from "@/context/web3UserContext";
import useBondingContract, {
  getTokenPrice,
} from "@/hooks/BondingCurvFactory/useBondingCurvContracts";
import useToken from "@/hooks/token/useToken";
import { useUniversalFactory } from "@/hooks/UniversalFactory/useUniversalFactoryContract";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { parse } from "path";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const IdPage: React.FC = () => {
  const [tokenPrice, setTokenPrice] = React.useState<string | null>(null);
  const router = useRouter();
  const { BuyTokens, SellTokens } = useBondingContract();
  const [amountBuy, setAmountBuy] = React.useState<number>(0);
  const [amountSell, setAmountSell] = React.useState<number>(0);
  const [sellLoading, setSellLoading] = React.useState<boolean>(false);
  const [update, setUpdate] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [amountETH, setAmountETH] = useState(0);
  const { user } = useUser();
  const { id } = router.query;
  const { approveMetamask } = useToken(id as `0x${string}`);
  const { tokenDeploy } = useUniversalFactory(
    user?.address as `0x${string}`,
    false,
    update,
    id as string
  );
  useEffect(() => {
    console.log(tokenDeploy);
  }, [tokenDeploy]);
  useEffect(() => {
    const btnBuy = document.getElementById("btn-buy");
    const btnSell = document.getElementById("btn-sell");
    const buyContent = document.querySelector(".buy-content");
    const sellContent = document.querySelector(".sell-content");

    if (btnBuy && btnSell && buyContent && sellContent) {
      const handleBuyClick = () => {
        btnBuy.classList.add("btn-switch-active");
        btnBuy.classList.remove("btn-switch");
        btnSell.classList.remove("btn-switch-active");
        btnSell.classList.add("btn-switch");
        buyContent.classList.remove("d-none");
        sellContent.classList.add("d-none");
      };

      const handleSellClick = () => {
        btnSell.classList.add("btn-switch-active");
        btnSell.classList.remove("btn-switch");
        btnBuy.classList.remove("btn-switch-active");
        btnBuy.classList.add("btn-switch");
        sellContent.classList.remove("d-none");
        buyContent.classList.add("d-none");
      };

      btnBuy.addEventListener("click", handleBuyClick);
      btnSell.addEventListener("click", handleSellClick);

      // Clean up event listeners on component unmount
      return () => {
        btnBuy.removeEventListener("click", handleBuyClick);
        btnSell.removeEventListener("click", handleSellClick);
      };
    }
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const priceInWei = await getTokenPrice(id as string);
        const priceInEth = ethers.utils.formatEther(priceInWei);
        setTokenPrice(priceInEth);
      } catch (error) {
        console.error("Error fetching token price:", error);
        setTokenPrice("Unavailable");
      }
    };
    fetchPrice();
    console.log(tokenDeploy);
  }, [id, update]);

  const handleBuy = async () => {
    if (!user) return;
    if (amountBuy <= 0) return toast.error("Amount must be greater than 0");
    setLoading(true);
    try {
      const result = await BuyTokens(amountBuy, id as string);
      if (result.status === "success") {
        setAmountBuy(0);
        setAmountETH(0);
        setUpdate(update + 1);
        toast.success(
          <span>
            Buy successful!{" "}
            <a
              href={`${BLOCKSCOUT_BASE_URL}${result.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Blockscout
            </a>
          </span>
        );
      } else {
        console.log(result);
        toast.error("Transaction failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Transaction failed: ${error}`);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSell = async () => {
    if (!tokenPrice || !amountSell) return;
    setSellLoading(true); // Start loading for sell
    try {
      const pricePerTokenInWei = ethers.utils.parseUnits(tokenPrice, "ether");
      const sellAmountWei = pricePerTokenInWei.mul(
        ethers.BigNumber.from(amountSell)
      );
      const approveResult = await approveMetamask(
        id as `0x${string}`,
        sellAmountWei
      );
      if (approveResult) {
        const sellResult = await SellTokens(amountSell, id as string);
        if (sellResult.status === "success") {
          setAmountSell(0);
          setUpdate(update + 1);
          toast.success(
            <span>
              Sell successful!{" "}
              <a
                href={`${BLOCKSCOUT_BASE_URL}${sellResult.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Blockscout
              </a>
            </span>
          );
        } else {
          console.log(sellResult);
          toast.error("Transaction failed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`Transaction failed: ${error}`);
    } finally {
      setSellLoading(false); // End loading for sell
    }
  };

  const handleETHChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    const ethValue = parseFloat(value);
    if (isNaN(ethValue) || ethValue < 0) {
      setAmountBuy(0);
      setAmountETH(e.target.value);
      return;
    }
    setAmountETH(e.target.value);
    setAmountBuy(ethValue / parseFloat(tokenPrice || "0"));
  };

  const formatNumber = (number: number) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 });
  };
  return (
    <>
      <Navbar />
      <section className="section-hero d-flex align-items-center min-vh-100">
        <div className="container-o text-center">
          <div className="row d-flex align-items center justify-content-center gx-0">
            <div className="col-12 col-md-10 text-start">
              <h3 className="" style={{ color: "rgba(255, 255, 255, 0.3)" }}>
                PAIR/ETH
              </h3>
              <h1 className="hero-title mb-3">Token Name</h1>
              <div className="row">
                <div className="col-10 mb-3">
                  <a
                    className="link-buy-sell d-inline-block"
                    style={{}}
                    href=""
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={14}
                      height={14}
                      fill="rgba(255,255,255,1)"
                    >
                      <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" />
                    </svg>{" "}
                    Blockscout explorer
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-4 col-lg-4"
              style={{ borderRadius: 20, overflow: "hidden" }}
            >
              {/*buttons switch*/}
              <div className="row gx-0">
                <div className="col-6">
                  <button id="btn-buy" className="btn-switch-active">
                    Buy
                  </button>
                </div>
                <div className="col-6">
                  <button id="btn-sell" className="btn-switch">
                    sell
                  </button>
                </div>
              </div>
              <div
                className="buy-sell-card-content"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: 10,
                  borderRadius: "0 0 20px 20px",
                }}
              >
                {/*content buy*/}
                <div className="buy-content">
                  <div
                    className="row gx-0 d-flex align-items-center mb-2"
                    style={{
                      padding: 30,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 10,
                    }}
                  >
                    <div className="col-10 text-start">
                      <input
                        className="input-buy-sell w-100"
                        placeholder={"0"}
                        type="text"
                        style={{
                          display: "block",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        disabled
                        value={amountBuy}
                      />
                    </div>
                    <div className="col-2 text-end">
                      <h5 className="ticker-buy-sell">
                        PAIR
                        <p />
                      </h5>
                    </div>
                  </div>
                  <div
                    className="row gx-0 d-flex align-items-center mb-2"
                    style={{
                      padding: 30,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 10,
                    }}
                  >
                    <div className="col-10 text-start">
                      <input
                        className="input-buy-sell w-100"
                        placeholder={"0"}
                        type="text"
                        style={{
                          display: "block",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onChange={handleETHChange}
                        value={amountETH}
                      />
                    </div>
                    <div className="col-2 text-end">
                      <h5 className="ticker-buy-sell">
                        ETH
                        <p />
                      </h5>
                    </div>
                  </div>
                  {loading ? (
                    <button className="primary-btn d-block w-100">
                      <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={handleBuy}
                      className="primary-btn d-block w-100"
                    >
                      Buy
                    </button>
                  )}
                </div>
                {/*content buy*/}
                {/*content sell*/}
                <div className="sell-content d-none">
                  <div
                    className="row gx-0 d-flex align-items-center mb-2"
                    style={{
                      padding: 30,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 10,
                    }}
                  >
                    <div className="col-10 text-start">
                      <input
                        className="input-buy-sell w-100"
                        placeholder={"0"}
                        type="text"
                        style={{
                          display: "block",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onChange={(e: any) =>
                          setAmountSell(Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="col-2 text-end">
                      <h5 className="ticker-buy-sell">
                        PAIR
                        <p />
                      </h5>
                    </div>
                  </div>
                  <div
                    className="row gx-0 d-flex align-items-center mb-2"
                    style={{
                      padding: 30,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 10,
                    }}
                  >
                    <div className="col-10 text-start">
                      <input
                        className="input-buy-sell w-100"
                        placeholder={"0"}
                        type="text"
                        style={{
                          display: "block",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        value={amountSell * parseFloat(tokenPrice || "0")}
                        disabled
                      />
                    </div>
                    <div className="col-2 text-end">
                      <h5 className="ticker-buy-sell">
                        ETH
                        <p />
                      </h5>
                    </div>
                  </div>
                  {sellLoading ? (
                    <button className="primary-btn d-block w-100">
                      <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={handleSell}
                      className="primary-btn d-block w-100"
                    >
                      Sell
                    </button>
                  )}
                </div>
                {/*content buy*/}
              </div>
            </div>
            <div
              className="col-12 col-4 col-lg-5 offset-lg-1"
              style={{ backgroundColor: "", padding: 20, borderRadius: 20 }}
            >
              <div className="questions">
                <div className="row">
                  <div className="col-5 text-start">
                    <h3 className="review-title mb-2">Token symbol</h3>
                  </div>
                  <div className="col-7 text-end">
                    <h4 className="review-value align-items-center white">
                      NME
                    </h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-5 text-start">
                    <h3 className="review-title mb-2">Deployment chain</h3>
                  </div>
                  <div className="col-7 text-end">
                    <h4 className="review-value align-items-center white">
                      Base
                    </h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-5 text-start">
                    <h3 className="review-title mb-2">Additionnal chains</h3>
                  </div>
                  <div className="col-7 text-end">
                    <h4 className="review-value align-items-center white">
                      Arbitrum, Optimism, Scroll, Ethereum
                    </h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-5 text-start">
                    <h3 className="review-title mb-2">Total supply</h3>
                  </div>
                  <div className="col-7 text-end">
                    <h4 className="review-value align-items-center white">
                      100,000,000 NME
                    </h4>
                  </div>
                </div>
                <hr />
                <div className="row mb-3">
                  <div className="col-5 text-start">
                    <h3 className="review-title mb-2">Bonding curve type</h3>
                  </div>
                  <div className="col-7 text-end">
                    <h4 className="review-value align-items-center white">
                      Linear
                    </h4>
                  </div>
                </div>
                <div
                  className="row d-flex align-items-center mb-3"
                  style={{
                    padding: "20px 10px 10px 10px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 10,
                  }}
                >
                  <div className="col-5 text-start">
                    <h3 className="review-title mb-2">Actual Price</h3>
                  </div>
                  <div className="col-7 text-end">
                    <h4 className="review-value align-items-center white">
                      {tokenPrice ? tokenPrice : "-"} ETH
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal success */}
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            style={{ paddingTop: 100 }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" style={{ padding: 30 }}>
                {/*loader*/}
                <div className="modal-body d-none">
                  <div
                    className="spinner-border text-primary mb-5"
                    role="status"
                    style={{ width: 150, height: 150 }}
                  ></div>
                  <h4 className="section-title mb-3">
                    Deployment of your token in Progress
                  </h4>
                  <p className="question-text mb-5">
                    Deploying your contract, please wait...
                  </p>
                </div>
                {/*loader*/}
                {/*validate*/}
                <div className="modal-body d-none">
                  <svg
                    className="mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={144}
                    height={144}
                    fill="rgba(37,213,169,1)"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
                  </svg>
                  <h4 className="section-title mb-3">
                    Token Deployment Successful !
                  </h4>
                  <p className="question-text mb-5">
                    Your contract has been successfully deployed !
                  </p>
                  <a className="primary-btn d-block" data-dismiss="modal">
                    Go to my token page
                  </a>
                </div>
                {/*validate*/}
                {/*issue*/}
                <div className="modal-body">
                  <svg
                    className="mb-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={144}
                    height={144}
                    fill="rgba(251,93,93,1)"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                  </svg>
                  <h4 className="section-title mb-3">
                    Token Deployment Errors
                  </h4>
                  <p className="question-text mb-5">
                    There was an error deploying your contract. Please try
                    again..
                  </p>
                  <a className="primary-btn d-block" data-dismiss="modal">
                    Close
                  </a>
                </div>
                {/*issue*/}
              </div>
            </div>
          </div>
        </div>
        {/*step4*/}
      </section>
    </>
  );
};

export default IdPage;
