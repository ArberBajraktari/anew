// wizardContext.js
import { createContext, useContext, useState } from 'react';

const WizardContext = createContext();

export const useWizardContext = () => {
  return useContext(WizardContext);
};

export const WizardProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState("home");
  const [formData, setFormData] = useState({});

  const select_chapter = () => {
    setCurrentStep("select_chapter");
  };

  const select_project = () => {
    setCurrentStep("select_project");
  };

  const select_order = () => {
    setCurrentStep("select_order");
  };

  const go_home = () => {
    setCurrentStep("home");
  };

  const go_home_chapter = () => {
    setCurrentStep("home_chapter");
  };

  const go_home_project = () => {
    setCurrentStep("home_project");
  };

  const go_ac_project = () => {
    setCurrentStep("ac_project");
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
        select_chapter,
        select_project,
        resetWizard,
        go_home,
        go_home_project,
        go_ac_project,
        select_order,
        go_home_chapter
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
