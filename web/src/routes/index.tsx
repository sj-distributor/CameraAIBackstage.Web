import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthStatus } from "@/hooks/auth-status";
import { useAuth } from "@/hooks/use-auth";
import { CameraFrondesk } from "@/pages/camera-frontdesk";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { IRouterList } from "@/services/dtos/routes";

export const Router = () => {
  const { routerList, myPermissions, locale, defaultPath } = useAuth();

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

  useEffect(() => {
    const handleTokenRefresh = (token: string, userName: string) => {
      if (window.$wujie?.props) {
        window.$wujie.props.token = token;
        window.$wujie.props.userName = userName;
      }
    };

    const registerListener = () => {
      if (window.$wujie?.bus) {
        window.$wujie.bus.$on("token_refresh", handleTokenRefresh);
      } else {
        console.log("Wujie bus 未初始化");
      }
    };

    registerListener();

    return () => {
      if (window.$wujie?.bus) {
        window.$wujie.bus.$off("token_refresh", handleTokenRefresh);
      }
    };
  }, []);

  return (
    <ConfigProvider locale={locale}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/frontdesk"
          element={
            <AuthStatus>
              <CameraFrondesk />
            </AuthStatus>
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
        <Route
          path="*"
          element={
            <AuthStatus>
              <Navigate to={defaultPath} />
            </AuthStatus>
          }
        />
      </Routes>
    </ConfigProvider>
  );
};
