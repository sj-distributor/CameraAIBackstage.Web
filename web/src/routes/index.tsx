import { Navigate, Route, Routes } from "react-router-dom";

import { AuthStatus } from "@/hooks/auth-status";
import { useAuth } from "@/hooks/use-auth";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { IRouterList } from "@/services/dtos/routes";

export const Router = () => {
  const { routerList, myPermissions } = useAuth();

  const AuthRoutes = (Routes: IRouterList[]) => {
    return Routes.map((childrenItem, childrenIndex) => {
      // const hasPermission = childrenItem.permissions
      //   ? [childrenItem.permissions].some((permission) =>
      //       [
      //         "CanViewCameraAiUserAccountPage",
      //         "CanViewCameraAiRoleUserPage",
      //         "CanViewCameraAiMonitorManagementPage",
      //         "CanAddCameraAiMonitor",
      //         "CanViewCameraAiAreaManagementPage",
      //       ].includes(permission)
      //     )
      //   : true; // 如果没有提供权限，则默认为true

      // if (!hasPermission) {
      //   return null; // 如果没有权限，返回null或者其他你认为合适的组件来隐藏该路由或子路由
      // }

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
