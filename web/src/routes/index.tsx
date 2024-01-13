import { Navigate, Route, Routes } from "react-router-dom";

import { AuthStatus } from "@/hooks/auth-status";
import { EquipmentList } from "@/pages/equipment/equipment-list";
import { EquipmentType } from "@/pages/equipment/equipment-type";
import { Home } from "@/pages/home/index";
import { Login } from "@/pages/login";
import { Main } from "@/pages/main";
import { Monitor } from "@/pages/monitor";
import { AreaManagement } from "@/pages/system/area-management";
import { LicensePlateManagement } from "@/pages/system/license-plate-management";
import { OperationLog } from "@/pages/system/operation-log";
import { PortraitList } from "@/pages/system/portrait-list";
import { UserList } from "@/pages/user/user-lilst";
import { UserPermissions } from "@/pages/user/user-permissions";
import { MonitorIcon, SystemIcon } from "@/routes/props";
export interface IRouterListProps {
  path: string;
  element: JSX.Element;
  name?: string;
  icon?: JSX.Element;
  children?: IRouterListProps[];
}

export const routerList: IRouterListProps[] = [
  {
    path: "/user",
    element: <Main />,
    name: "用戶管理",
    icon: <MonitorIcon path="/user" />,
    children: [
      { path: "", element: <Navigate to={"/user/list"} /> },
      { path: "/user/list", element: <UserList />, name: "用戶列表" },
      {
        path: "/user/permissions",
        element: <UserPermissions />,
        name: "用戶管理",
      },
    ],
  },
  {
    path: "/equipment",
    element: <Main />,
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
    name: "監測管理",
    icon: <MonitorIcon path="/monitor" />,
  },
  {
    path: "/system",
    element: <Main />,
    name: "系統管理",
    icon: <SystemIcon path="/system" />,
    children: [
      { path: "", element: <Navigate to={"/system/portraitList"} /> },
      {
        path: "/system/portraitList",
        element: <PortraitList />,
        name: "人像列表",
      },
      {
        path: "/system/licensePlateManagement",
        element: <LicensePlateManagement />,
        name: "車牌管理",
      },
      {
        path: "/system/areaManagement",
        element: <AreaManagement />,
        name: "區域管理",
      },
      {
        path: "/system/operationLog",
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
