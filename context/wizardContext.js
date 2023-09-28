// wizardContext.js
import { createContext, useContext, useState } from 'react';

const WizardContext = createContext();

export const useProjectWizardContext = () => {
  return useContext(WizardContext);
};

export const ProjectWizardProvider = ({ children }) => {
  const [currentProjectStep, setCurrentProjectStep] = useState("home");
  const [formData, setFormData] = useState({});

  const project_critertia = () => {
    setCurrentProjectStep("project_criteria");
  };

  const go_home = () => {
    setCurrentProjectStep("home");
  };

  const go_ac_project = () => {
    setCurrentProjectStep("ac_project");
  };

  const previousStep = () => {
    setCurrentProjectStep(currentStep - 1);
  };

  const resetWizard = () => {
    setCurrentProjectStep(1);
    setFormData({});
  };

  return (
    <WizardContext.Provider
      value={{
        currentProjectStep,
        formData,
        setFormData,
        project_critertia,
        previousStep,
        resetWizard,
        go_ac_project,
        go_home
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
