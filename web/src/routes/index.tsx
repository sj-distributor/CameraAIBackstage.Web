import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthStatus } from "@/hooks/auth-status";
import { useAuth } from "@/hooks/use-auth";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { IRouterList } from "@/services/dtos/routes";

export const Router = () => {
  const { routerList, myPermissions, locale, signIn, defaultPath } = useAuth();

  const [aPageData, setAPageData] = useState<string>("");

  useEffect(() => {
    if (aPageData) {
      localStorage.setItem(
        (window as any).appSettings?.tokenKey ?? "tokenKey",
        aPageData
      );
      signIn(aPageData);
      // localStorage.removeItem("aPageData");
    }
  }, [aPageData]);

  useEffect(() => {
    const aPageData = localStorage.getItem("aPageData");

    if (aPageData) {
      setAPageData(aPageData);
    } else {
      window.addEventListener("message", receiveMessage, false);
    }

    function receiveMessage(event: { origin: string; data: string }) {
      if (event.origin !== (window as any).appSettings?.frontDeskDomain) return;
      if (event.data) {
        localStorage.setItem("aPageData", event.data);
      }
    }
  }, []);

  const AuthRoutes = (Routes: IRouterList[]) => {
    return Routes.map((childrenItem, childrenIndex) => {
      const hasPermission = childrenItem.permissions
        ? [childrenItem.permissions].some((permission) =>
            myPermissions.includes(permission)
          )
        : true; // 如果没有提供权限，则默认为true

      if (!hasPermission) {
        return null; // 返回null以过滤
      }

      return (
        <Route
          key={childrenIndex}
          path={childrenItem.path}
          element={childrenItem.element}
        >
          {childrenItem.children && AuthRoutes(childrenItem.children)}
        </Route>
      );
    }).filter(Boolean); // 过滤掉为null的元素;
  };

  return (
    <ConfigProvider locale={locale}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={defaultPath} />} />
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
    </ConfigProvider>
  );
};
