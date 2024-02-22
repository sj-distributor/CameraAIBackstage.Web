import type { Locale } from "antd/es/locale";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

import { MonitorIcon, SystemIcon } from "@/assets/sider";
import KEYS from "@/i18n/language/keys/home-menu-keys";
import { EquipmentList } from "@/pages/equipment/equipment-list";
import { EquipmentType } from "@/pages/equipment/equipment-type";
import { Container } from "@/pages/main";
import { Monitor } from "@/pages/monitor";
import { AreaManagement } from "@/pages/system/area-management";
import { LicensePlateManagement } from "@/pages/system/license-plate-management";
import { OperationLog } from "@/pages/system/operation-log";
import { PortraitList } from "@/pages/system/portrait-list";
import { UserList } from "@/pages/user/user-lilst";
import { PermissionsList } from "@/pages/user/user-permissions";
import { UserDistribute } from "@/pages/user/user-permissions/distribute";
import { UserPermissions } from "@/pages/user/user-permissions/permission-list";
import { AddNewPermissions } from "@/pages/user/user-permissions/user-newpermissions";
import { IRouterList } from "@/services/dtos/routes";

interface IAuthContextType {
  language: string;
  t: TFunction<"translation", undefined>;
  changeLanguage: (language: string) => void;
  locale: Locale;
  routerList: IRouterList[];
}

export const AuthContext = React.createContext<IAuthContextType>(null!);

export default ({ children }: { children: React.ReactNode }) => {
  const { i18n, t } = useTranslation();

  const [locale, setLocal] = React.useState<Locale>(enUS);

  const localStorageLanguage = localStorage.getItem("language") ?? "";

  const [language, setLanguage] = React.useState<string>(localStorageLanguage);

  const routerList: IRouterList[] = [
    {
      path: "/user",
      element: <Container />,
      name: t(KEYS.USER_MANAGEMENT, { ns: "homeMenu" }),
      icon: <MonitorIcon path="/user" />,
      children: [
        { path: "", element: <Navigate to={"/user/list"} /> },
        {
          path: "/user/list",
          element: <UserList />,
          name: t(KEYS.USER_LIST, { ns: "homeMenu" }),
        },
        {
          path: "/user/permissions",
          element: <PermissionsList />,
          name: t(KEYS.USER_PERMISSIONS, { ns: "homeMenu" }),
          children: [
            {
              path: "",
              element: <UserPermissions />,
            },
            {
              path: "/user/permissions/newpermissions",
              element: <AddNewPermissions />,
            },
            {
              path: "/user/permissions/permissionslist",
              element: <UserPermissions />,
            },
            {
              path: "/user/permissions/distribute",
              element: <UserDistribute />,
            },
          ],
        },
      ],
    },
    {
      path: "/equipment",
      element: <Container />,
      name: t(KEYS.DEVICE_MANAGEMENT, { ns: "homeMenu" }),
      icon: <MonitorIcon path="/equipment" />,
      children: [
        { path: "", element: <Navigate to={"/equipment/list"} /> },
        {
          path: "/equipment/list",
          element: <EquipmentList />,
          name: t(KEYS.DEVICE_LIST, { ns: "homeMenu" }),
        },
        {
          path: "/equipment/type",
          element: <EquipmentType />,
          name: t(KEYS.DEVICE_TYPE, { ns: "homeMenu" }),
        },
      ],
    },
    {
      path: "/monitor",
      element: <Monitor />,
      name: t(KEYS.MONITOR, { ns: "homeMenu" }),
      icon: <MonitorIcon path="/monitor" />,
    },
    {
      path: "/system",
      element: <Container />,
      name: t(KEYS.SYSTEM_MANAGEMENT, { ns: "homeMenu" }),
      icon: <SystemIcon path="/system" />,
      children: [
        { path: "", element: <Navigate to={"/system/portrait"} /> },
        {
          path: "/system/portrait",
          element: <PortraitList />,
          name: t(KEYS.PORTRAIT_LIST, { ns: "homeMenu" }),
        },
        {
          path: "/system/license",
          element: <LicensePlateManagement />,
          name: t(KEYS.LICENSE_PLATE_MANAGEMENT, { ns: "homeMenu" }),
        },
        {
          path: "/system/area",
          element: <AreaManagement />,
          name: t(KEYS.AREA_MANAGEMENT, { ns: "homeMenu" }),
        },
        {
          path: "/system/log",
          element: <OperationLog />,
          name: t(KEYS.OPERATION_LOG, { ns: "homeMenu" }),
        },
      ],
    },
  ];

  const changeLanguage = (language: string) => {
    setLanguage(language);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    setLocal(language === "en" ? enUS : zhCN);
    localStorage.setItem("language", language);
  }, [i18n, language]);

  useEffect(() => {
    localStorage.getItem("language")
      ? setLanguage(localStorage.getItem("language") as string)
      : setLanguage("en");
  }, []);

  const value = { language, t, locale, changeLanguage, routerList };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
