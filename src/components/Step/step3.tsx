import { useStep } from "@/context/StepContext";
import React from "react";


export const Step3: React.FC = () => {
    const { goToPreviousStep, goToNextStep } = useStep();
  return (
    <div id="step3" className="step3">
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
            Below are the details regarding the total supply, pricing, and
            distribution curve of your token. These values are fixed and for
            informational purposes only.
          </p>
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
            This is the fixed type of bonding curve for your token distribution.
            A bonding curve is a mathematical concept used in tokenomics to
            manage the supply and price of tokens. It defines how the token's
            price changes as its supply increases or decreases.
          </p>
          <div className="input-container">
            <h4 className="answer-noclick align-items-center">Linear</h4>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
          <a
            onClick={() => goToNextStep()}
            className="primary-btn d-block text-center mb-2 cursor-pointer"
          >
            Next step
          </a>
          <div className="d-flex justify-content-center">
            <button
              onClick={() => goToPreviousStep()}
              className="btn-back text-center mb-2 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
