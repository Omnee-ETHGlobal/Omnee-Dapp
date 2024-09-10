import { useStep } from "@/context/StepContext";
import { Step1Props } from "@/types/step1Props";
import { ChangeEvent } from "react";

export const Step1 = ({ deployData, setDeployData, error }: Step1Props) => {
  const { goToNextStep, goToPreviousStep } = useStep();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeployData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
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
            Choose the name of your project, it will be displayed everywhere.
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
            Choose the name of your project, it will be displayed everywhere.
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
            onClick={() => goToNextStep()}  // Fix : Appeler la fonction au clic
            className="primary-btn d-block text-center mb-2 cursor-pointer"
          >
            Next step
          </a>
          <div className="d-flex justify-content-center">
            <button
              onClick={() => goToPreviousStep()}  // Fix : Appeler la fonction au clic
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
