import { message } from "antd";
import type { Locale } from "antd/es/locale";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { TFunction } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

import { MonitorIcon, SystemIcon } from "@/assets/sider";
import KEYS from "@/i18n/language/keys/home-menu-keys";
import KEY from "@/i18n/language/keys/user-permissions-keys";
import { EquipmentList } from "@/pages/equipment/equipment-list";
import { EquipmentType } from "@/pages/equipment/equipment-type";
import { Container } from "@/pages/main";
import { Monitor } from "@/pages/monitor";
import { AddSelectType } from "@/pages/monitor/component/add-select-type";
import { AddOrUpdateConfiguration } from "@/pages/monitor/component/add-update-configuration";
import { AreaManagement } from "@/pages/system/area-management";
import { LicensePlateManagement } from "@/pages/system/license-plate-management";
import { OperationLog } from "@/pages/system/operation-log";
import { PortraitList } from "@/pages/system/portrait-list";
import { UserList } from "@/pages/user/user-lilst";
import { PermissionsList } from "@/pages/user/user-permissions";
import { UserDistribute } from "@/pages/user/user-permissions/distribute";
import { UserPermissions } from "@/pages/user/user-permissions/permission-list";
import { NewOrUpdatePermissions } from "@/pages/user/user-permissions/user-newpermissions";
import { GetCurrentAccountPermission } from "@/services/api/user-permission";
import { IRouterList } from "@/services/dtos/routes";

interface IAuthContextType {
  language: string;
  t: TFunction<"translation", undefined>;
  changeLanguage: (language: string) => void;
  locale: Locale;
  routerList: IRouterList[];
  haveRoles: number[];
  myPermissions: string[];
  getMyPermission: () => void;
  token: string;
  signIn: (auth: string, callback?: VoidFunction) => void;
  signOut: () => void;
}

export const AuthContext = React.createContext<IAuthContextType>(null!);

export default ({ children }: { children: React.ReactNode }) => {
  const { i18n, t } = useTranslation();

  const navigate = useNavigate();

  const [locale, setLocal] = React.useState<Locale>(enUS);

  const localStorageLanguage = localStorage.getItem("language") ?? "";

  const [language, setLanguage] = React.useState<string>(localStorageLanguage);

  const [haveRoles, setHaveRoles] = useState<number[]>([]);

  const [myPermissions, setMyPermissions] = useState<string[]>([]);

  const tokenKey =
    ((window as any).appsettings?.tokenKey as string) ?? "tokenKey";

  const defaultToken = localStorage.getItem(tokenKey) ?? "";

  const [token, setToken] = useState<string>(defaultToken);

  const signIn = (auth: string, callback?: VoidFunction) => {
    setToken(auth);
    localStorage.setItem(tokenKey, auth);
    navigate("/user/list");
    callback && callback();
  };

  const signOut = () => {
    setToken("");
    localStorage.removeItem(tokenKey);
  };

  const routerList: IRouterList[] = [
    {
      path: "/user",
      element: <Container />,
      name: t(KEYS.USER_MANAGEMENT, { ns: "homeMenu" }),
      icon: <MonitorIcon path="/user" />,
      children: [
        {
          path: "",
          element: <Navigate to={"/user/list"} />,
          permissions: "CanViewCameraAiUserAccountPage",
        },
        {
          path: "/user/list",
          element: <UserList />,
          name: t(KEYS.USER_LIST, { ns: "homeMenu" }),
          permissions: "CanViewCameraAiUserAccountPage",
        },
        {
          path: "/user/permissions",
          element: <PermissionsList />,
          name: t(KEYS.USER_PERMISSIONS, { ns: "homeMenu" }),
          permissions: "CanViewCameraAiRoleUserPage",
          children: [
            {
              path: "",
              element: <UserPermissions />,
              permissions: "CanViewCameraAiRoleUserPage",
            },
            {
              path: "/user/permissions/list",
              element: <UserPermissions />,
              permissions: "CanViewCameraAiRoleUserPage",
            },
            {
              path: "/user/permissions/roles/:id?",
              element: <NewOrUpdatePermissions />,
              permissions: "CanUpdatePermissionsOfRole",
            },
            {
              path: "/user/permissions/distribute/:id?",
              element: <UserDistribute />,
              permissions: "CanCreateRoleUser",
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
        {
          path: "",
          element: <Navigate to={"/equipment/list"} />,
          permissions: "CanViewCameraAiEquipmentPage",
        },
        {
          path: "/equipment/list",
          element: <EquipmentList />,
          name: t(KEYS.DEVICE_LIST, { ns: "homeMenu" }),
          permissions: "CanViewCameraAiEquipmentPage",
        },
        {
          path: "/equipment/type",
          element: <EquipmentType />,
          name: t(KEYS.DEVICE_TYPE, { ns: "homeMenu" }),
          permissions: "CanViewCameraAiEquipmentTypePage",
        },
      ],
    },
    {
      path: "/monitor",
      element: <Container />,
      name: t(KEYS.MONITOR, { ns: "homeMenu" }),
      icon: <MonitorIcon path="/monitor" />,
      permissions: "CanViewCameraAiMonitorManagementPage",
      children: [
        {
          path: "",
          element: <Monitor />,
          permissions: "CanViewCameraAiMonitorManagementPage",
        },
        {
          path: "/monitor/add",
          element: <AddSelectType />,
          permissions: "CanAddCameraAiMonitor",
        },
        {
          path: "/monitor/configuration/:type/:id",
          element: <AddOrUpdateConfiguration />,
          permissions: "CanUpdateCameraAiMonitor",
        },
      ],
    },
    {
      path: "/system",
      element: <Container />,
      name: t(KEYS.SYSTEM_MANAGEMENT, { ns: "homeMenu" }),
      icon: <SystemIcon path="/system" />,
      children: [
        {
          path: "",
          element: <Navigate to={"/system/portrait"} />,
          permissions: "CanViewCameraAiPortraitManagementPage",
        },
        {
          path: "/system/portrait",
          element: <PortraitList />,
          name: t(KEYS.PORTRAIT_LIST, { ns: "homeMenu" }),
          permissions: "CanViewCameraAiPortraitManagementPage",
        },
        {
          path: "/system/license",
          element: <LicensePlateManagement />,
          name: t(KEYS.LICENSE_PLATE_MANAGEMENT, { ns: "homeMenu" }),
          permissions: "CanViewCameraAiLicensePlateManagementPage",
        },
        {
          path: "/system/area",
          element: <AreaManagement />,
          name: t(KEYS.AREA_MANAGEMENT, { ns: "homeMenu" }),
          permissions: "CanViewCameraAiAreaManagementPage",
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

  const getMyPermission = () => {
    GetCurrentAccountPermission()
      .then((response) => {
        if (
          response.rolePermissionData &&
          response.rolePermissionData?.length > 0
        ) {
          const roles = response.rolePermissionData.map(
            (item) => item.role.id!
          );

          const rolePermissions = response.rolePermissionData.reduce(
            (accumulator, currentValue) => {
              currentValue.permissions.forEach((item) => {
                if (accumulator.includes(item.name)) {
                  return;
                } else {
                  accumulator.push(item.name);
                }
              });

              return accumulator;
            },
            [] as string[]
          );

          setHaveRoles(roles);
          setMyPermissions(rolePermissions);
        } else {
          message.error(
            t(KEY.ABNORMAL_PERMISSION_DATA, { ns: "userPermissions" })
          );
        }
      })
      .catch((error) => {
        message.error(error.msg);
        setMyPermissions([]);
      });
  };

  useEffect(() => {
    if (token) getMyPermission();
  }, [token]);

  useEffect(() => {
    i18n.changeLanguage(language);
    setLocal(language === "en" ? enUS : zhCN);
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.getItem("language")
      ? setLanguage(localStorage.getItem("language") as string)
      : setLanguage("ch");
  }, []);

  const value = {
    language,
    t,
    locale,
    changeLanguage,
    routerList,
    haveRoles,
    myPermissions,
    getMyPermission,
    token,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
