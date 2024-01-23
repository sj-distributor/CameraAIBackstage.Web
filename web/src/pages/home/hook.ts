import { useNavigate } from "react-router-dom";

export const useAction = () => {
  const navigate = useNavigate();

  return {
    navigate,
  };
};
