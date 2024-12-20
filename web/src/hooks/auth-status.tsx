import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./use-auth";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token } = useAuth();

  if (window.__POWERED_BY_WUJIE__) {
    window.$wujie.props?.token || window.$wujie.props?.signOut();
  } else if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
