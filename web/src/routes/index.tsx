import { Navigate, Route, Routes } from "react-router-dom";

import { AuthStatus } from "@/hooks/auth-status";
import { useAuth } from "@/hooks/use-auth";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { IRouterList } from "@/services/dtos/routes";

export const Router = () => {
  const { routerList } = useAuth();

  const AuthRoutes = (Routes: IRouterList[]) => {
    return Routes.map((childrenItem, childrenIndex) => (
      <Route
        key={childrenIndex}
        path={childrenItem.path}
        element={childrenItem.element}
      >
        {childrenItem.children && AuthRoutes(childrenItem.children)}
      </Route>
    ));
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={"/user/list"} />} />
      <Route element={<Home />}>
        {routerList.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={<AuthStatus>{item.element}</AuthStatus>}
          >
            {item.children && AuthRoutes(item.children)}
          </Route>
        ))}
      </Route>
    </Routes>
  );
};
