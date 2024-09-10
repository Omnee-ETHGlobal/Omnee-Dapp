import { useDeploy } from "@/context/DeployContext";
import { useStep } from "@/context/StepContext";
import React from "react";

export const Step4: React.FC = () => {
  const { deployData, handleDeployClick } = useDeploy();
  const {goToPreviousStep} = useStep();
  return (
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
            Please review all the information you have provided. If everything is correct, click on the "Confirm" button to finalize your token creation.
          </p>
        </div>
      </div>

      {/* Détails du token */}
      <div
        className="row justify-content-center mb-1"
        data-aos="fade-in"
        data-aos-duration={500}
        data-aos-delay={500}
        data-aos-easing="ease"
      >
        <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
          {/* Affichage des données de déploiement */}
          <div className="row">
            <div className="col-5 text-start">
              <h3 className="review-title mb-2">Project Name</h3>
            </div>
            <div className="col-7 text-end">
              <h4 className="review-value align-items-center white">
                {deployData?.name || "N/A"}
              </h4>
            </div>
          </div>
          <hr />
          {/* Autres données */}
          {/* Chaînes sélectionnées, etc. */}
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-12 col-sm-10 col-md-5 col-lg-5 text-start">
          <a
            onClick={handleDeployClick}
            className="primary-btn d-block text-center mb-2 cursor-pointer"
          >
            Confirm
          </a>
          <div className="d-flex justify-content-center">
            <button onClick={goToPreviousStep} className="btn-back text-center mb-2 cursor-pointer">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
