import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthStatus } from "@/hooks/auth-status";
import { useAuth } from "@/hooks/use-auth";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { IRouterList } from "@/services/dtos/routes";
// import { isEmpty, isNil } from "ramda";

export const Router = () => {
  const { routerList, myPermissions, locale, defaultPath } = useAuth();

  const pathname = window.location.pathname;

  // const receiveMessage = (event: { origin: string; data: string }) => {
  //   console.log(event);

  //   if (event.origin !== (window as any).appSettings?.frontDeskDomain) return;

  //   if (event.data) {
  //     localStorage.setItem(
  //       (window as any).appSettings?.tokenKey ?? "tokenKey",
  //       event.data
  //     );
  //   }
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem("tokenKey");

  //   if (isNil(token) || isEmpty(token)) {
  //     window.addEventListener("message", receiveMessage, false);
  //   }
  // }, []);

  useEffect(() => {
    // 请求 token
    const requestToken = () => {
      window.postMessage(
        "requestToken",
        (window as any).appSettings?.frontDeskDomain
      );
    };

    // 监听来自其他窗口的消息
    const handleMessage = (event: { origin: string; data: string }) => {
      console.log(event);

      if (event.origin === (window as any).appSettings?.frontDeskDomain) {
        if (event.data) {
          localStorage.setItem(
            (window as any).appSettings?.tokenKey ?? "tokenKey",
            event.data
          );
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // 确保窗口加载完成后请求 token
    if (document.readyState === "complete") {
      console.log(121212);

      requestToken();
    } else {
      window.onload = requestToken;
    }

    // 清理事件监听器
    return () => {
      window.removeEventListener("message", handleMessage);
    };
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

  const pathsList = routerList
    .flatMap((item) => [
      item.path,
      ...(item.children ? item.children.map((child) => child.path) : []),
    ])
    .filter((item) => item && !item.includes("id"));

  return (
    <ConfigProvider locale={locale}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <Navigate
              to={
                pathsList.includes(pathname) ||
                pathname.startsWith("/monitor/configuration/") ||
                pathname.startsWith("/user/permissions/roles/") ||
                pathname.startsWith("/user/permissions/distribute/")
                  ? pathname
                  : defaultPath
              }
            />
          }
        />
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
