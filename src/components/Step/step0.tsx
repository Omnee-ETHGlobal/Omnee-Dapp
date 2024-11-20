import { useStep } from "@/context/StepContext";
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi";

export const Step0 = () => {
    const { address } = useAccount();
    const { goToNextStep } = useStep();

    return (
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
                  {!address ? (
                    <div className="pb-4">
                    <ConnectButton />
                    </div>
                  ) : (
                    <button
                      className="primary-btn d-inline-block mb-5"
                      onClick={() => goToNextStep()}
                      data-aos="fade-in"
                      data-aos-duration={500}
                      data-aos-delay={100}
                      data-aos-easing="ease"
                    >
                      Get started{" "}
                    </button>
                  )}
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
    )
}