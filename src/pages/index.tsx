import Navbar from "@/components/navbar/navbar";
import { Step0 } from "@/components/Step/step0";
import { Step1 } from "@/components/Step/step1";
import { Step2 } from "@/components/Step/step2";
import { Step3 } from "@/components/Step/step3";
import { Step4 } from "@/components/Step/step4";
import { useDeploy } from "@/context/DeployContext";
import { useStep } from "@/context/StepContext";
import useDeployByLoginMethod from "@/hooks/useDeployContract";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Create: React.FC = () => {
  const [selectedChains, setSelectedChains] = useState<number[]>([]);
  const [successDeploy, setSuccessDeploy] = useState(false);
  const { step } = useStep();
  const [error, setError] = useState("");
  const [setEstimatedFee] = useState<bigint | null>(null);
  const {
    deployLoading,
    deployData,
    setDeployData,
    showFailedModal,
    successModal,
    setShowFailedModal,
    transactionUrl,
  } = useDeploy();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si le composant n'est pas monté côté client, ne rien afficher pour éviter une erreur d'hydratation
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <section className="section-hero d-flex align-items-center min-vh-100">
        <div className="container-o text-center">
          {/* Steps */}
          {step === 0 && <Step0 />}
          {step === 1 && (
            <Step1
              error={error}
              deployData={deployData}
              setDeployData={setDeployData}
            />
          )}
          {step === 2 && (
            <Step2
              selectedChains={selectedChains}
              setSelectedChains={setSelectedChains}
            />
          )}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}

          {/* Modal Backdrop */}
          {(deployLoading || successModal || showFailedModal) && (
            <div
              className="modal-backdrop-custom"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1040,
              }}
            ></div>
          )}

          {/* Modal */}
          {(deployLoading || successModal || showFailedModal) && (
            <div className="modal-content">
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

              {/* Success Modal */}
              {successModal && (
                <div className="modal-body">
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
                    Token Deployment Successful!
                  </h4>
                  <p className="question-text mb-5">
                    Your contract has been successfully deployed!
                  </p>
                  {transactionUrl && (
                    <a
                      href={transactionUrl}
                      target="_blank"
                      className="question-text mb-5"
                    >
                      See on Blockscout explorer
                    </a>
                  )}
                  <a href="/app" className="primary-btn w-100 mt-2 d-block">
                    Go to app
                  </a>
                </div>
              )}

              {/* Error Modal */}
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
                    again.
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
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Create;
