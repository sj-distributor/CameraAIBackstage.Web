import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./use-auth";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
