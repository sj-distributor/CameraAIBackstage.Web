import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAction = () => {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState<{
    updatePassword: boolean;
    logOut: boolean;
  }>({ updatePassword: false, logOut: false });

  return {
    isHover,
    navigate,
    setIsHover,
  };
};
