import { BLOCKSCOUT_BASE_URL } from "@/config/api/blockscoutApi";
import useDeployByLoginMethod from "@/hooks/useDeployContract";
import { Chain } from "@/types/chain";
import { DeployData } from "@/types/deployData";
import { ethers } from "ethers";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Create: React.FC = () => {
  const [selectedChains, setSelectedChains] = useState<number[]>([]);
  const [successDeploy, setSuccessDeploy] = useState(false);
  const handleChainChange = (chainId: number) => {
    setSelectedChains((prev) => {
      const isAlreadySelected = prev.includes(chainId);
      if (isAlreadySelected) {
        return prev.filter((id) => id !== chainId);
      } else {
        return [...prev, chainId];
      }
    });
  };
  const [error, setError] = useState("");
  const [deployLoading, setDeployLoading] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState<bigint | null>(null);
  const { deployByLoginMethod, estimateGasFees } = useDeployByLoginMethod();
  const [deployData, setDeployData] = useState<DeployData>({
    name: "",
    symbol: "",
  });
  const [step, setStep] = useState(0);

  const getFees = async () => {
    const result = await estimateGasFees(deployData, selectedChains);
    console.log(result);
    if (result) {
      setEstimatedFee(result);
    } else {
      console.log("Error getting fees");
    }
  };

  const chains: Chain[] = [
    { id: 40231, name: "Arbitrum", logo: "./images/chains/arb.png" },
    { id: 40232, name: "Optimism", logo: "./images/chains/op.png" },
    { id: 40170, name: "Scroll", logo: "./images/chains/scro.png" },
  ];

  const getSelectedChainNames = (
    selectedChains: number[],
    allChains: Chain[]
  ): string => {
    return allChains
      .filter((chain) => selectedChains.includes(chain.id))
      .map((chain) => chain.name)
      .join(", ");
  };

  const handleNextStep = () => {
    if (!deployData.name || !deployData.symbol) {
      setError("Error, please verify your information");
    } else {
      setError("");
      setStep(step + 1);
    }
  };

  const selectedChainNames = getSelectedChainNames(selectedChains, chains);

  useEffect(() => {
    if (step === 4) {
      getFees();
    }
  }, [step]);

  const handleDeployClick = async () => {
    setDeployLoading(true);
    try {
      const result = await deployByLoginMethod(deployData, selectedChains);
      if (result.status === "success") {
        setSuccessDeploy(true);
        console.log(result);
        toast.success(
          <span>
            Deploy successful!{" "}
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
        setSuccessDeploy(false);
        setShowFailedModal(true);
        toast.error("Transaction failed");
      }
    } catch (error) {
      setSuccessDeploy(false);
      setShowFailedModal(true);
      toast.error(`Deploy failed: ${error}`);
    } finally {
      setDeployLoading(false);
    }
  };
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
      <section className="section-hero d-flex align-items-center min-vh-100">
        <div className="container-o text-center">
          {/*get started*/}
          {step === 0 && (
            <div id="get-started" className="get-started ">
              <div className="row mb-1">
                <div className="col-12 col-sm-10 col-md-6 col-lg-6 text-start">
                  <span
                    className="pill-step mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={100}
                    data-aos-easing="ease"
                  >
                    Estimated time : 5 minutes
                  </span>
                  <h1
                    className="create-title mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={150}
                    data-aos-easing="ease"
                  >
                    Create your omnichain token seamlessly on every EVM chain
                  </h1>
                  <p
                    className="hero-subtitle mb-4"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={200}
                    data-aos-easing="ease"
                  >
                    Create and deploy your unique token effortlessly. Follow
                    these straightforward steps to bring your project to life in
                    minutes!
                  </p>
                  <button
                    className="primary-btn d-inline-block mb-5"
                    onClick={() => setStep(1)}
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={100}
                    data-aos-easing="ease"
                  >
                    Get started{" "}
                  </button>
                </div>
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 offset-md-1 offset-lg-1 text-start">
                  <div
                    className="timeline"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={200}
                    data-aos-easing="ease"
                  >
                    <div
                      className="timeline-step"
                      data-aos="fade-in"
                      data-aos-duration={400}
                      data-aos-delay={100}
                      data-aos-easing="ease"
                    >
                      <h5 className="timeline-create-pill">Step 1</h5>
                      <h2 className="timeline-create-title">
                        Basic Token informations
                      </h2>
                      <p className="timeline-create-text">
                        Provide the foundational details of your token:
                      </p>
                    </div>
                    <div
                      className="timeline-step"
                      data-aos="fade-in"
                      data-aos-duration={400}
                      data-aos-delay={100}
                      data-aos-easing="ease"
                    >
                      <h5 className="timeline-create-pill">Step 2</h5>
                      <h2 className="timeline-create-title">Project Details</h2>
                      <p className="timeline-create-text">
                        Add key information about your project
                      </p>
                    </div>
                    <div
                      className="timeline-step"
                      data-aos="fade-in"
                      data-aos-duration={400}
                      data-aos-delay={100}
                      data-aos-easing="ease"
                    >
                      <h5 className="timeline-create-pill">Step 3</h5>
                      <h2 className="timeline-create-title">
                        Technical Settings
                      </h2>
                      <p className="timeline-create-text">
                        Set up the technical parameters for your token
                      </p>
                    </div>
                    <div
                      className="timeline-step"
                      data-aos="fade-in"
                      data-aos-duration={400}
                      data-aos-delay={100}
                      data-aos-easing="ease"
                    >
                      <h5 className="timeline-create-pill">Step 4</h5>
                      <h2 className="timeline-create-title">
                        Financial Details and Curve
                      </h2>
                      <p className="timeline-create-text">
                        Add key information about your project
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <img
                    className="img-fluid"
                    src="./images/create-token-1.png"
                    alt=""
                    data-aos="fade-up"
                    data-aos-duration={500}
                    data-aos-delay={200}
                    data-aos-easing="ease"
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid"
                    src="./images/create-token-2.png"
                    alt=""
                    data-aos="fade-up"
                    data-aos-duration={500}
                    data-aos-delay={500}
                    data-aos-easing="ease"
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid"
                    src="./images/create-token-3.png"
                    alt=""
                    data-aos="fade-up"
                    data-aos-duration={500}
                    data-aos-delay={400}
                    data-aos-easing="ease"
                  />
                </div>
              </div>
            </div>
          )}

          {/*get started*/}
          {/*step1*/}
          {step === 1 && (
            <div id="step1" className="step1 ">
              <div className="row justify-content-center mb-1">
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <span
                    className="pill-step mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={100}
                    data-aos-easing="ease"
                  >
                    Step 1/4
                  </span>
                  <h1
                    className="create-title mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={150}
                    data-aos-easing="ease"
                  >
                    Tell us more a little about your project
                  </h1>
                  <p
                    className="hero-subtitle mb-5"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={200}
                    data-aos-easing="ease"
                  >
                    Please provide the basic information for your token.
                  </p>
                </div>
              </div>
              <div
                className="row justify-content-center mb-4"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={300}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <h3 className="question-title mb--">Project name</h3>
                  <p className="question-text mb-3">
                    Choose the name of your project, it will be displayed
                    everywhere.
                  </p>
                  <div className="input-container">
                    <input
                      value={deployData.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDeployData({ ...deployData, name: e.target.value })
                      }
                      type="text"
                      className="styled-input"
                      placeholder="Enter the name of your project"
                      id="inputText"
                    />
                  </div>
                </div>
              </div>
              <div
                className="row justify-content-center mb-1"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={400}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <h3 className="question-title mb-2">Token Symbol</h3>
                  <p className="question-text mb-3">
                    Choose the name of your project, it will be displayed
                    everywhere.
                  </p>
                  <div className="input-container">
                    <input
                      value={deployData.symbol}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDeployData({ ...deployData, symbol: e.target.value })
                      }
                      type="text"
                      className="styled-input"
                      placeholder="Enter the symbol of your token"
                      id="inputSymbol"
                    />
                  </div>
                </div>
              </div>
              <div
                className="row justify-content-center mb-5"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={500}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  {error && (
                    <p className="question-error" style={{ color: "red" }}>
                      {error}
                    </p>
                  )}
                  <a
                    onClick={handleNextStep}
                    className="primary-btn d-block text-center mb-2 cursor-pointer"
                  >
                    Next step
                  </a>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => setStep(0)}
                      className="btn-back text-center mb-2 cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div id="step2" className="step2 ">
              <div className="row justify-content-center mb-1">
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <span
                    className="pill-step mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={100}
                    data-aos-easing="ease"
                  >
                    Step 2/4
                  </span>
                  <h1
                    className="create-title mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={150}
                    data-aos-easing="ease"
                  >
                    Deployment Information
                  </h1>
                  <p
                    className="hero-subtitle mb-5"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={200}
                    data-aos-easing="ease"
                  >
                    Please provide the necessary information regarding the
                    deployment of your token.
                  </p>
                  <p />
                </div>
              </div>
              <div
                className="row justify-content-center mb-4"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={300}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <h3 className="question-title mb--">Deployment Chain</h3>
                  <p className="question-text mb-3">
                    This is the fixed blockchain where your token will be
                    deployed.
                  </p>
                  <div className="input-container">
                    <h4 className="answer-noclick align-items-center">
                      <img
                        src="./images/chains/base.png"
                        className="answer-no-click-im img-fluid me-2"
                        style={{ width: 30 }}
                        alt=""
                      />{" "}
                      BASE Chain
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="row justify-content-center mb-4"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={400}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <h3 className="question-title mb-2">
                    Additional Deployment Chains
                  </h3>
                  <p className="question-text mb-3">
                    Select the additional blockchains where your token will be
                    deployed.
                  </p>
                  <div className="input-container">
                    <div className="row gx-2 mb-2">
                      <div className="col-6 col-md-6">
                        <div
                          className={`answer-clickable align-items-center ${
                            selectedChains.includes(40231) ? "active" : ""
                          }`}
                          onClick={() => handleChainChange(40231)}
                        >
                          <img
                            src="./images/chains/arb.png"
                            className="answer-clickable-img img-fluid me-2"
                            alt=""
                          />{" "}
                          Arbitrum
                        </div>
                      </div>
                      <div className="col-6 col-md-6">
                        <div
                          className={`answer-clickable align-items-center ${
                            selectedChains.includes(40232) ? "active" : ""
                          }`}
                          onClick={() => handleChainChange(40232)}
                        >
                          <img
                            src="./images/chains/op.png"
                            className="answer-clickable-img img-fluid me-2"
                            alt=""
                          />{" "}
                          Optimism
                        </div>
                      </div>
                    </div>
                    <div className="row gx-2">
                      <div className="col-6 col-md-6">
                        <div
                          className={`answer-clickable align-items-center ${
                            selectedChains.includes(40170) ? "active" : ""
                          }`}
                          onClick={() => handleChainChange(40170)}
                        >
                          <img
                            src="./images/chains/scro.png"
                            className="answer-clickable-img img-fluid me-2"
                            alt=""
                          />{" "}
                          Scroll
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mb-5">
              <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <a
                    onClick={() => setStep(3)}
                    className="primary-btn d-block text-center mb-2 cursor-pointer"
                  >
                    Next step
                  </a>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-back text-center mb-2 cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*step2*/}

          {/*step2*/}
          {/*step3*/}
          {step === 3 && (
            <div id="step3" className="step3 ">
              <div className="row justify-content-center mb-1">
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <span
                    className="pill-step mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={100}
                    data-aos-easing="ease"
                  >
                    Step 3/4
                  </span>
                  <h1
                    className="create-title mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={150}
                    data-aos-easing="ease"
                  >
                    Token Supply and Pricing
                  </h1>
                  <p
                    className="hero-subtitle mb-5"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={200}
                    data-aos-easing="ease"
                  >
                    Below are the details regarding the total supply, pricing,
                    and distribution curve of your token. These values are fixed
                    and for informational purposes only..
                  </p>
                  <p />
                </div>
              </div>
              <div
                className="row justify-content-center mb-1"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={500}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <h3 className="question-title mb-2">Total Supply</h3>
                  <p className="question-text mb-3">
                    This is the fixed total number of tokens available.
                  </p>
                  <div className="input-container">
                    <h4 className="answer-noclick align-items-center">
                      {" "}
                      100,000,000 tokens
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="row justify-content-center mb-1"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={500}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <h3 className="question-title mb-2">Token Price</h3>
                  <p className="question-text mb-3">
                    This is the fixed price of your token in ETH.
                  </p>
                  <div className="input-container">
                    <h4 className="answer-noclick align-items-center">
                      {" "}
                      0.000000001&nbsp;Ξ
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="row justify-content-center mb-1"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={500}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <h3 className="question-title mb-2">Bonding Curve Type</h3>
                  <p className="question-text mb-3">
                    This is the fixed type of bonding curve for your token
                    distribution. A bonding curve is a mathematical concept used
                    in tokenomics to manage the supply and price of tokens. It
                    defines how the token's price changes as its supply
                    increases or decreases.
                  </p>
                  <div className="input-container">
                    <h4 className="answer-noclick align-items-center">
                      Linear
                    </h4>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mb-5">
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <a
                    onClick={() => setStep(4)}
                    className="primary-btn d-block text-center mb-2 cursor-pointer"
                  >
                    Next step
                  </a>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => setStep(2)}
                      className="btn-back text-center mb-2 cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/*step3*/}
          {/*step4*/}
          {step === 4 && (
            <div id="step4" className="step4">
              <div className="row justify-content-center mb-1">
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <span
                    className="pill-step mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={100}
                    data-aos-easing="ease"
                  >
                    Step 4/4
                  </span>
                  <h1
                    className="create-title mb-3"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={150}
                    data-aos-easing="ease"
                  >
                    Review and Confirm Your Token Details
                  </h1>
                  <p
                    className="hero-subtitle mb-5"
                    data-aos="fade-in"
                    data-aos-duration={500}
                    data-aos-delay={200}
                    data-aos-easing="ease"
                  >
                    Please review all the information you have provided. If
                    everything is correct, click on the "Confirm" button to
                    finalize your token creation.
                  </p>
                  <p />
                </div>
              </div>
              <div
                className="row justify-content-center mb-1"
                data-aos="fade-in"
                data-aos-duration={500}
                data-aos-delay={500}
                data-aos-easing="ease"
              >
                <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <div className="row">
                    <div className="col-5 text-start">
                      <h3 className="review-title mb-2">Project Name</h3>
                    </div>
                    <div className="col-7 text-end">
                      <h4 className="review-value align-items-center white">
                        {deployData.name}
                      </h4>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-5 text-start">
                      <h3 className="review-title mb-2">Token symbol</h3>
                    </div>
                    <div className="col-7 text-end">
                      <h4 className="review-value align-items-center white">
                        {deployData.symbol}
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
                        {selectedChainNames || "No chains selected"}
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
                        100 000 000
                      </h4>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-5 text-start">
                      <h3 className="review-title mb-2">Token price</h3>
                    </div>
                    <div className="col-7 text-end">
                      <h4 className="review-value align-items-center white">
                        0.000000001 ETH
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
                      <h3 className="review-title mb-2">Deployment price</h3>
                    </div>
                    <div className="col-7 text-end">
                      <h4 className="review-value align-items-center white">
                        Estimated Fee:{" "}
                        {estimatedFee
                          ? ethers.utils.formatEther(estimatedFee)
                          : "Loading..."}{" "}
                        ETH
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center mb-5">
              <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
                  <a
                    onClick={handleDeployClick}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    className="primary-btn d-block text-center mb-2"
                  >
                    Confirm
                  </a>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => setStep(3)}
                      className="btn-back text-center mb-2 cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                {deployLoading && (
                  <div className="modal-body">
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
                )}
                {/*loader*/}
                {/*loader*/}
                {/*validate*/}
                {successDeploy && (
                  <div className="modal-body ">
                    <svg
                      className="mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={144}
                      height={144}
                      fill="rgba(37,213,169,1)"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z" />
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
                )}
                {/*validate*/}
                {/*issue*/}
                {showFailedModal && (
                  <div className="modal-body">
                    <svg
                      className="mb-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={144}
                      height={144}
                      fill="rgba(251,93,93,1)"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" />
                    </svg>
                    <h4 className="section-title mb-3">
                      Token Deployment Errors
                    </h4>
                    <p className="question-text mb-5">
                      There was an error deploying your contract. Please try
                      again..
                    </p>
                    <a
                      onClick={() => setShowFailedModal(false)}
                      className="primary-btn d-block"
                      data-dismiss="modal"
                    >
                      Close
                    </a>
                  </div>
                )}

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

export default Create;
