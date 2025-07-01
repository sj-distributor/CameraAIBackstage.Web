import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import WujieReact from "wujie-react";

import { useAuth } from "@/hooks/use-auth";

export const CameraFrondesk = () => {
  const { bus } = WujieReact;

  const navigate = useNavigate();

  const { signOut, defaultPath, isSuperAdmin } = useAuth();

  const tokenKey = (window as any).appSettings.tokenKey;

  const userNameKey = (window as any).appSettings.userNameKey;

  const goAdminStage = () => {
    const newWindow = window.open(
      `${window.location.origin}/${defaultPath}`,
      "_blank"
    );

    if (newWindow) {
      newWindow.document.write(`
        <script>
          sessionStorage.setItem("backstage", "admin");
          window.location.href = "${defaultPath}";
        </script>
      `);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const newToken = localStorage.getItem(tokenKey);

        const newUserName = localStorage.getItem(userNameKey);

        bus.$emit("token_refresh", newToken, newUserName);
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div>
      {isSuperAdmin ? (
        <WujieReact
          width="100%"
          height="100%"
          name="CameraFrontdesk"
          url={(window as any).appSettings.cameraAIFrontdeskDomain}
          sync={true}
          alive={false}
          fiber={true}
          props={{
            userName: localStorage.getItem(userNameKey),
            token: localStorage.getItem(tokenKey),
            signOut: () => signOut(() => navigate("/login", { replace: true })),
            goBackstage: () => goAdminStage(),
          }}
        />
      ) : (
        <Navigate to={defaultPath} replace={true} />
      )}
    </div>
  );
};
