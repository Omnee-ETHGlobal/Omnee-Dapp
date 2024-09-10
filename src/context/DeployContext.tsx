import React, { createContext, useState, ReactNode, useContext } from 'react';
import { toast } from 'react-toastify';
import { BLOCKSCOUT_BASE_URL } from '@/config/api/blockscoutApi';
import useDeployByLoginMethod from '@/hooks/useDeployContract';

interface DeployProviderProps {
  children: ReactNode;
}

interface DeployContextType {
  deployData: any;
  setDeployData: React.Dispatch<React.SetStateAction<any>>;
  selectedChains: number[];
  setSelectedChains: React.Dispatch<React.SetStateAction<number[]>>;
  estimatedFee: string | null;
  transactionUrl: string | null;
  successDeploy: boolean;
  deployLoading: boolean;
  successModal: boolean; // État pour la modal de succès
  showFailedModal: boolean; // État pour la modal d'erreur
  setSuccessModal: (open: boolean) => void;
  setShowFailedModal: (open: boolean) => void;
  handleDeployClick: () => void;
  getFees: () => Promise<void>;
}

const DeployContext = createContext<DeployContextType | undefined>(undefined);

export const DeployProvider: React.FC<DeployProviderProps> = ({ children }) => {
  const [deployData, setDeployData] = useState<any>({});
  const [selectedChains, setSelectedChains] = useState<number[]>([]);
  const [estimatedFee, setEstimatedFee] = useState<string | null>(null);
  const [transactionUrl, setTransactionUrl] = useState<string | null>(null);
  const [successDeploy, setSuccessDeploy] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // État pour contrôler la modal de succès
  const [showFailedModal, setShowFailedModal] = useState(false); // État pour contrôler la modal d'erreur
  const { deployToUniversalFactory, estimateGasFees } = useDeployByLoginMethod();

  const handleDeployClick = async () => {
    setDeployLoading(true);
    try {
      const result = await deployToUniversalFactory(deployData, selectedChains);
      if (result) {
        setSuccessModal(true)
        setSuccessDeploy(true);
        setTransactionUrl(`${BLOCKSCOUT_BASE_URL}${result.transactionHash}`);
      } else {
        console.log('failed');
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

  const getFees = async () => {
    try {
      const result: bigint | undefined = await estimateGasFees(deployData, selectedChains);
      if (result) {
        setEstimatedFee(result.toString());
      } else {
        console.log("Error getting fees");
      }
    } catch (error) {
      console.error(`Error estimating fees: ${error}`);
    }
  };

  return (
    <DeployContext.Provider
      value={{
        deployData,
        setDeployData,
        selectedChains,
        setSelectedChains,
        estimatedFee,
        transactionUrl,
        successDeploy,
        deployLoading,
        successModal, // Expose l'état de la modal de succès
        showFailedModal, // Expose l'état de la modal d'erreur
        setSuccessModal, // Expose la fonction pour contrôler la modal de succès
        setShowFailedModal,
        handleDeployClick,
        getFees,
      }}
    >
      {children}
    </DeployContext.Provider>
  );
};

export const useDeploy = () => {
  const context = useContext(DeployContext);
  if (!context) {
    throw new Error('useDeploy must be used within a DeployProvider');
  }
  return context;
};
