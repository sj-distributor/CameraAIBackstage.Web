import { Navigate, Route, Routes } from "react-router-dom";

import { MonitorIcon, SystemIcon } from "@/assets/sider";
import { AuthStatus } from "@/hooks/auth-status";
import { EquipmentList } from "@/pages/equipment/equipment-list";
import { EquipmentType } from "@/pages/equipment/equipment-type";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { Container } from "@/pages/main";
import { Monitor } from "@/pages/monitor";
import { AreaManagement } from "@/pages/system/area-management";
import { LicensePlateManagement } from "@/pages/system/license-plate-management";
import { OperationLog } from "@/pages/system/operation-log";
import { PortraitList } from "@/pages/system/portrait-list";
import { UserList } from "@/pages/user/user-lilst";
import { UserPermissions } from "@/pages/user/user-permissions";
import { IRouterList } from "@/services/dtos/routes";

export const routerList: IRouterList[] = [
  {
    path: "/user",
    element: <Container />,
    name: "用戶管理",
    icon: <MonitorIcon path="/user" />,
    children: [
      { path: "", element: <Navigate to={"/user/list"} /> },
      { path: "/user/list", element: <UserList />, name: "用戶列表" },
      {
        path: "/user/permissions",
        element: <UserPermissions />,
        name: "用戶權限",
      },
    ],
  },
  {
    path: "/equipment",
    element: <Container />,
    name: "設備管理",
    icon: <MonitorIcon path="/equipment" />,
    children: [
      { path: "", element: <Navigate to={"/equipment/list"} /> },
      {
        path: "/equipment/list",
        element: <EquipmentList />,
        name: "設備列表",
      },
      {
        path: "/equipment/type",
        element: <EquipmentType />,
        name: "設備類型",
      },
    ],
  },
  {
    path: "/monitor",
    element: <Monitor />,
  },
  {
    path: "/system",
    element: <Container />,
    name: "系統管理",
    icon: <SystemIcon path="/system" />,
    children: [
      { path: "", element: <Navigate to={"/system/portrait"} /> },
      {
        path: "/system/portrait",
        element: <PortraitList />,
        name: "人像列表",
      },
      {
        path: "/system/license",
        element: <LicensePlateManagement />,
        name: "車牌管理",
      },
      {
        path: "/system/area",
        element: <AreaManagement />,
        name: "區域管理",
      },
      {
        path: "/system/log",
        element: <OperationLog />,
        name: "操作日誌",
      },
    ],
  },
];

export const Router = () => {
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
