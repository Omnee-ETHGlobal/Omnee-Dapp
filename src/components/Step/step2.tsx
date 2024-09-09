import { chainsData } from "@/config/chainConfig";
import { useStep } from "@/context/StepContext";
import { Step2Props } from "@/types/step2Props";

export const Step2: React.FC<Step2Props> = ({
  selectedChains,
  setSelectedChains,
}) => {
  const { goToNextStep, goToPreviousStep } = useStep();

  const handleChainChange = (chainId: number) => {
    if (selectedChains.includes(chainId)) {
      setSelectedChains(selectedChains.filter((id) => id !== chainId));
    } else {
      setSelectedChains([...selectedChains, chainId]);
    }
  };

  return (
    <div id="step2" className="step2">
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
            Please provide the necessary information regarding the deployment of
            your token.
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
          <h3 className="question-title mb-2">Deployment Chain</h3>
          <p className="question-text mb-3">
            This is the fixed blockchain where your token will be deployed.
          </p>
          <div className="input-container">
            <h4 className="answer-noclick align-items-center">
              <img
                src="./images/chains/base.png"
                className="answer-no-click-im img-fluid me-2"
                style={{ width: 30 }}
                alt="Base Chain"
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
          <h3 className="question-title mb-2">Additional Deployment Chains</h3>
          <p className="question-text mb-3">
            Select the additional blockchains where your token will be deployed.
          </p>
          <div className="input-container">
            <div className="row gx-2 mb-2">
              <div className="col-6 col-md-6">
                <div
                  className={`answer-clickable align-items-center ${
                    selectedChains.includes(chainsData.Arbitrum.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleChainChange(chainsData.Arbitrum.id)}
                >
                  <img
                    src="./images/chains/arb.png"
                    className="answer-clickable-img img-fluid me-2"
                    alt="Arbitrum"
                  />{" "}
                  Arbitrum
                </div>
              </div>
              <div className="col-6 col-md-6">
                <div
                  className={`answer-clickable align-items-center ${
                    selectedChains.includes(chainsData.Optimism.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleChainChange(chainsData.Optimism.id)}
                >
                  <img
                    src="./images/chains/op.png"
                    className="answer-clickable-img img-fluid me-2"
                    alt="Optimism"
                  />{" "}
                  Optimism
                </div>
              </div>
            </div>
            <div className="row gx-2">
              <div className="col-6 col-md-6">
                <div
                  className={`answer-clickable align-items-center ${
                    selectedChains.includes(chainsData.Scroll.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleChainChange(chainsData.Scroll.id)}
                >
                  <img
                    src="./images/chains/scro.png"
                    className="answer-clickable-img img-fluid me-2"
                    alt="Scroll"
                  />{" "}
                  Scroll
                </div>
              </div>
              <div className="col-6 col-md-6">
                <div
                  className={`answer-clickable align-items-center ${
                    selectedChains.includes(chainsData.Zircuit.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleChainChange(chainsData.Zircuit.id)}
                >
                  <img
                    src="./images/chains/zircuit.png"
                    className="answer-clickable-img img-fluid me-2"
                    alt="Zircuit"
                  />{" "}
                  Zircuit
                </div>
              </div>
            </div>
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
