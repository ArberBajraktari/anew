// wizardContext.js
import { createContext, useContext, useState } from 'react';

const WizardContext = createContext();

export const useWizardContext = () => {
  return useContext(WizardContext);
};

export const WizardProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState("home");
  const [formData, setFormData] = useState({});

  const chapter_critertia = () => {
    setCurrentStep("chapter_criteria");
  };

  const go_home = () => {
    setCurrentStep("home");
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setFormData({});
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        formData,
        setFormData,
        chapter_critertia,
        previousStep,
        resetWizard,
        go_home
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
