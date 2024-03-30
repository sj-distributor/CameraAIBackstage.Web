import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAction = () => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  const [menuInformation, setMenuInformation] = useState<{
    openKeys: string[];
    selectedKeys: string[];
  }>({
    openKeys: ["/" + pathname.split("/")[1]],
    selectedKeys: [
      pathname.includes("monitor")
        ? "/" + pathname.split("/")[1]
        : "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2],
    ],
  });

  return {
    menuInformation,
    navigate,
    setMenuInformation,
  };
};
