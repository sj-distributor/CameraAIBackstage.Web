import { useState } from "react";

export const useAction = () => {
  const [showWarningDetails, setShowWarningDetails] = useState<string>("1");

  const [isRegisteredVehicle, setIsRegisteredVehicle] =
    useState<boolean>(false);

  return {
    showWarningDetails,
    isRegisteredVehicle,
    setIsRegisteredVehicle,
    setShowWarningDetails,
  };
};
