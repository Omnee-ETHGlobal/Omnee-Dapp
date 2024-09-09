import { createContext, useState, useContext, ReactNode } from "react";

// Créer le contexte
const StepContext = createContext<any>(null);

// Fournisseur du contexte (provider)
interface StepProviderProps {
  children: ReactNode; // Typage de 'children'
}

export const StepProvider = ({ children }: StepProviderProps) => {
  const [step, setStep] = useState(0);

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <StepContext.Provider value={{ step, setStep, goToNextStep, goToPreviousStep }}>
      {children}
    </StepContext.Provider>
  );
};

// Hook pour utiliser le contexte dans tes composants
export const useStep = () => {
  return useContext(StepContext);
};
