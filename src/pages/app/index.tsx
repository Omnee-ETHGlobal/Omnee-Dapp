import { useEffect, useState } from "react";
import { getCurrentDeploy } from "@/hooks/UniversalFactory/useUniversalFactoryContract";
import { useGraphQLQuery } from "@/hooks/GraphQL/useGraphQlQuery";
import TokenCard from "../../components/tokenCard";
import Navbar from "@/components/navbar/navbar";

const Home: React.FC = () => {
  const { data, loading } = useGraphQLQuery();
  const [currentDeploy, setCurrentDeploy] = useState<BigInt | null>(null);
  const [currentDeployLoading, setCurrentDeployLoading] = useState(false);
  useEffect(() => {
    const fetchCurrentDeploy = async () => {
      try {
        setCurrentDeployLoading(true);
        const deployId = await getCurrentDeploy();
        setCurrentDeploy(deployId);
      } catch (e) {
        console.error("Error fetching current deploy ID:", e);
      } finally {
        setCurrentDeployLoading(false);
      }
    };
    fetchCurrentDeploy();
  }, []);
  return (
    <>
      <Navbar />
      <div className="section-hero">
        <div className="container-o text-center">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 text-center">
              <span className="pill-step mb-3">
                {currentDeployLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  `${
                    currentDeploy
                      ? (parseInt(currentDeploy.toString(), 10) - 1).toString()
                      : "-"
                  } tokens`
                )}
              </span>

              <h1 className="hero-title">Discover all tokens</h1>
              <p className="hero-subtitle">Choose, Take a look, invest</p>
            </div>
          </div>
          {loading ? (
            <div className="row gx-3">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="row gx-3">
              {data?.oftcreateds.map((token: any) => (
                <TokenCard key={token.id} token={token} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
