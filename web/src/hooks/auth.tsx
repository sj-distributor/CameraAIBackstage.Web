import { DatabaseOutlined, TeamOutlined } from "@ant-design/icons";
import { useUpdateEffect } from "ahooks";
import { message } from "antd";
import type { Locale } from "antd/es/locale";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { TFunction } from "i18next";
import { isNil } from "ramda";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";

import { MonitorIcon, SystemIcon } from "@/assets/sider";
import KEYS from "@/i18n/language/keys/home-menu-keys";
import KEY from "@/i18n/language/keys/user-permissions-keys";
import { EquipmentList } from "@/pages/equipment/equipment-list";
import { EquipmentType } from "@/pages/equipment/equipment-type";
import { Container } from "@/pages/main";
import { Monitor } from "@/pages/monitor";
import { AddSelectType } from "@/pages/monitor/component/add-select-type";
import { AddOrUpdateConfiguration } from "@/pages/monitor/component/add-update-configuration";
// 出入口管理
// import { AccessManagement } from "@/pages/system/access-management";
import { AreaManagement } from "@/pages/system/area-management";
import { LicensePlateManagement } from "@/pages/system/license-plate-management";
import { OperationLog } from "@/pages/system/operation-log";
import { PortraitList } from "@/pages/system/portrait-list";
import { TeamList } from "@/pages/team-list";
import { TeamInfo } from "@/pages/user/team-info";
import { UserList } from "@/pages/user/user-lilst";
import { UserDetail } from "@/pages/user/user-lilst/user-detail";
import { PermissionsList } from "@/pages/user/user-permissions";
import { UserDistribute } from "@/pages/user/user-permissions/distribute";
import { UserPermissions } from "@/pages/user/user-permissions/permission-list";
import { NewOrUpdatePermissions } from "@/pages/user/user-permissions/user-newpermissions";
import {
  BackGroundRolePermissionEnum,
  FrontRolePermissionEnum,
} from "@/pages/user/user-permissions/user-newpermissions/props";
import { GetCurrentAccountPermission } from "@/services/api/user-permission";
import { ITeamListProps } from "@/services/dtos/login";
import { IRouterList } from "@/services/dtos/routes";
import { IUserDataItem } from "@/services/dtos/user";

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
  signOut: (callback?: VoidFunction) => void;
  defaultPath: string;
  permission: { isGetPermission: boolean; hasSwitchCameraAiBackEnd: boolean };
  userNameKey: string;
  currentTeam: ITeamListProps;
  setCurrentTeam: React.Dispatch<React.SetStateAction<ITeamListProps>>;
  currentAccount: IUserDataItem;
  setCurrentAccount: React.Dispatch<React.SetStateAction<IUserDataItem>>;
  isSuperAdmin: boolean;
}

export const AuthContext = React.createContext<IAuthContextType>(null!);

export default ({ children }: { children: React.ReactNode }) => {
  const { i18n, t } = useTranslation();

  const [locale, setLocal] = React.useState<Locale>(enUS);

  const localStorageLanguage = localStorage.getItem("language") ?? "";

  const [language, setLanguage] = React.useState<string>(localStorageLanguage);

  const [haveRoles, setHaveRoles] = useState<number[]>([]);

  const [myPermissions, setMyPermissions] = useState<string[]>([]);

  const tokenKey =
    ((window as any).appSettings?.tokenKey as string) ?? "tokenKey";

  const userNameKey =
    ((window as any).appSettings?.userNameKey as string) ?? "userName";

  const defaultToken = localStorage.getItem(tokenKey) ?? "";

  const [token, setToken] = useState<string>(defaultToken);

  const [defaultPath, setDefaultPath] = useState<string>("");

  const [permission, setPermission] = useState<{
    isGetPermission: boolean;
    hasSwitchCameraAiBackEnd: boolean;
  }>({
    isGetPermission: false,
    hasSwitchCameraAiBackEnd: false,
  });

  const localCurrentTeam = JSON.parse(
    localStorage.getItem("currentTeam") ?? "{}"
  );

  const localCurrentAccount = JSON.parse(
    localStorage.getItem("currentAccount") ?? "{}"
  );

  const [currentTeam, setCurrentTeam] = useState<ITeamListProps>({
    id: localCurrentTeam.id ?? "",
    name: localCurrentTeam.name ?? "",
    leaderId: localCurrentTeam.leaderId ?? "",
    tenantId: localCurrentTeam.tenantId ?? "",
    avatarUrl: localCurrentTeam.avatarUrl ?? "",
  });

  const [currentAccount, setCurrentAccount] =
    useState<IUserDataItem>(localCurrentAccount);

  const isSuperAdmin = useMemo(() => {
    // admin 普通后台  superAdmin 超管后台
    return sessionStorage.getItem("backstage") === "superAdmin";
  }, [sessionStorage.getItem("backstage")]);

  const signIn = (auth: string, callback?: VoidFunction) => {
    setToken(auth);
    localStorage.setItem(tokenKey, auth);
    callback && callback();
  };

  const signOut = (callback?: VoidFunction) => {
    setToken("");
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userNameKey);
    sessionStorage.removeItem("backstage");
    localStorage.removeItem("currentTeam");
    localStorage.removeItem("currentAccount");
    callback && callback();
  };

  const routerList: IRouterList[] = isSuperAdmin
    ? [
        {
          path: "/team",
          element: <Container />,
          name: t(KEYS.TEAM_MANAGEMENT, { ns: "homeMenu" }),
          icon: <TeamOutlined />,
          children: [
            {
              path: "",
              element: <Navigate to="/team/list" />,
            },
            {
              path: "/team/list",
              element: <TeamList />,
              name: t(KEYS.TEAM_LIST, { ns: "homeMenu" }),
            },
            {
              path: "/team/userList",
              element: <Outlet />,
              name: t(KEYS.USER_MANAGEMENT, { ns: "homeMenu" }),
              children: [
                {
                  path: "",
                  element: <UserList />,
                },
                {
                  path: "/team/userList/detail",
                  element: <UserDetail />,
                },
              ],
            },
          ],
        },
        {
          path: "/resource",
          element: <Container />,
          name: t(KEYS.RESOURCE_MANAGEMENT, { ns: "homeMenu" }),
          icon: <DatabaseOutlined />,
          children: [
            {
              path: "",
              element: <Navigate to={"/resource/equipmentList"} />,
            },
            {
              path: "/resource/equipmentList",
              element: <EquipmentList />,
              name: t(KEYS.DEVICE_LIST, { ns: "homeMenu" }),
            },
          ],
        },
      ]
    : [
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
              element: <Outlet />,
              name: t(KEYS.USER_LIST, { ns: "homeMenu" }),
              permissions: "CanViewCameraAiUserAccountPage",
              children: [
                {
                  path: "",
                  element: <UserList />,
                },
                {
                  path: "/user/list/detail",
                  element: <UserDetail />,
                },
              ],
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
            {
              path: "/user/teamInfo",
              element: <TeamInfo />,
              name: t(KEYS.TEAM_INFO, { ns: "homeMenu" }),
              permissions: "CanViewCameraAiTeam",
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
    GetCurrentAccountPermission({ TeamId: currentTeam.id })
      .then((response) => {
        if (
          response?.rolePermissionData &&
          response?.rolePermissionData?.length > 0
        ) {
          const roles = response?.rolePermissionData.map(
            (item) => item.role.id!
          );

          const rolePermissions = response?.rolePermissionData.reduce(
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

          setPermission((prevState) => ({
            ...prevState,
            isGetPermission: true,
            hasSwitchCameraAiBackEnd: rolePermissions.some(
              (permission) =>
                permission === FrontRolePermissionEnum.CanSwitchCameraAiBackEnd
            ),
          }));
        } else {
          message.error(
            t(KEY.ABNORMAL_PERMISSION_DATA, { ns: "userPermissions" })
          );
        }
      })
      .catch((error) => {
        message.error((error as Error).message);
        setMyPermissions([]);
        setPermission({
          isGetPermission: true,
          hasSwitchCameraAiBackEnd: false,
        });
      });
  };

  useEffect(() => {
    if (token) {
      if (isSuperAdmin) {
        setDefaultPath("/team/list");

        setPermission({
          isGetPermission: true,
          hasSwitchCameraAiBackEnd: true,
        });
      } else if (
        (localStorage?.getItem(userNameKey) ?? "").toLowerCase() === "admin" &&
        isNil(sessionStorage.getItem("backstage"))
      ) {
        sessionStorage.setItem("backstage", "superAdmin");

        setDefaultPath("/team/list");

        setPermission({
          isGetPermission: true,
          hasSwitchCameraAiBackEnd: true,
        });
      } else {
        getMyPermission();
      }
    }
  }, [token, sessionStorage.getItem("backstage")]);

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

  useUpdateEffect(() => {
    const defaultPage = myPermissions.includes(
      BackGroundRolePermissionEnum.CanViewCameraAiUserAccountPage
    )
      ? "/user/list"
      : myPermissions.includes(
          BackGroundRolePermissionEnum.CanViewCameraAiRoleUserPage
        )
      ? "/user/permissions"
      : myPermissions.includes(
          BackGroundRolePermissionEnum.CanViewCameraAiEquipmentPage
        )
      ? "/equipment/list"
      : myPermissions.includes(
          BackGroundRolePermissionEnum.CanViewCameraAiEquipmentTypePage
        )
      ? "/equipment/type"
      : myPermissions.includes(
          BackGroundRolePermissionEnum.CanViewCameraAiMonitorManagementPage
        )
      ? "/monitor"
      : myPermissions.includes(
          BackGroundRolePermissionEnum.CanViewCameraAiPortraitManagementPage
        )
      ? "/system/portrait"
      : myPermissions.includes(
          BackGroundRolePermissionEnum.CanViewCameraAiLicensePlateManagementPage
        )
      ? "/system/license"
      : myPermissions.includes(
          BackGroundRolePermissionEnum.CanViewCameraAiAreaManagementPage
        )
      ? "/system/area"
      : "/system/log";

    setDefaultPath(defaultPage);
  }, [myPermissions]);

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
    defaultPath,
    permission,
    userNameKey,
    currentTeam,
    setCurrentTeam,
    currentAccount,
    setCurrentAccount,
    isSuperAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
