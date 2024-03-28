import { useState } from "react";

export const useAction = () => {
  const [showWarningDetails, setShowWarningDetails] = useState<
    string | undefined
  >("");

  const [isRegisteredVehicle, setIsRegisteredVehicle] =
    useState<boolean>(false);

  return {
    showWarningDetails,
    isRegisteredVehicle,
    setIsRegisteredVehicle,
    setShowWarningDetails,
  };
};
