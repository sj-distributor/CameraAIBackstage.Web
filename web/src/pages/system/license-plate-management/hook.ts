import { useState } from "react";

export const useAction = () => {
  const [showWarningDetails, setShowWarningDetails] = useState<string>();

  return {
    showWarningDetails,
    setShowWarningDetails,
  };
};
