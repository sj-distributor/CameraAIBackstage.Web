import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAction = () => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  const [isHover, setIsHover] = useState<{
    updatePassword: boolean;
    logOut: boolean;
  }>({ updatePassword: false, logOut: false });

  const [menuInformation, setMenuInformation] = useState<{
    openKeys: string[];
    selectedKeys: string[];
  }>({
    openKeys: ["/" + pathname.split("/")[1]],
    selectedKeys: [pathname],
  });

  return {
    isHover,
    menuInformation,
    navigate,
    setIsHover,
    setMenuInformation,
  };
};
