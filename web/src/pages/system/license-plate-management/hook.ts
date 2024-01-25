import { useState } from "react";

export const useAction = () => {
  const [showWarningDetails, setShowWarningDetails] = useState<string>();

  const [isRegisteredVehicle, setIsRegisteredVehicle] =
    useState<boolean>(false);

  return {
    showWarningDetails,
    isRegisteredVehicle,
    setIsRegisteredVehicle,
    setShowWarningDetails,
  };
};
