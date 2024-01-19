import { Navigate, Route, Routes } from "react-router-dom";

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

export const Router = () => {
  const routerList: IRouterList[] = [
    {
      path: "/user",
      element: <Container />,
      children: [
        { path: "", element: <Navigate to={"/user/list"} /> },
        {
          path: "/user/list",
          element: <UserList />,
        },
        {
          path: "/user/permissions",
          element: <UserPermissions />,
        },
      ],
    },
    {
      path: "/equipment",
      element: <Container />,
      children: [
        { path: "", element: <Navigate to={"/equipment/list"} /> },
        {
          path: "/equipment/list",
          element: <EquipmentList />,
        },
        {
          path: "/equipment/type",
          element: <EquipmentType />,
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
      children: [
        { path: "", element: <Navigate to={"/system/portrait"} /> },
        {
          path: "/system/portrait",
          element: <PortraitList />,
        },
        {
          path: "/system/license",
          element: <LicensePlateManagement />,
        },
        {
          path: "/system/area",
          element: <AreaManagement />,
        },
        {
          path: "/system/log",
          element: <OperationLog />,
        },
      ],
    },
  ];

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
