import { Navigate, Route, Routes } from "react-router-dom";

import { AuthStatus } from "@/hooks/auth-status";
import { useAuth } from "@/hooks/use-auth";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { NotFound } from "@/pages/not-found";

export const Router = () => {
  const { routerList } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path="*" element={<Navigate to={"/user/list"} />} />

      <Route element={<Home />}>
        {routerList.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={<AuthStatus>{item.element}</AuthStatus>}
          >
            {item.children &&
              item.children.length > 0 &&
              item.children.map((childrenItem, childrenIndex) => {
                return (
                  <Route
                    key={childrenIndex}
                    path={childrenItem.path}
                    element={childrenItem.element}
                  />
                );
              })}
          </Route>
        ))}
      </Route>
    </Routes>
  );
};
