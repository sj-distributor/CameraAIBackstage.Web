import { useDebounceFn } from "ahooks";
import { App } from "antd";
import { isEmpty, isNil } from "ramda";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import {
  GetAccountInfoApi,
  GetTeamsMineApi,
  Login,
} from "@/services/api/login";
import { GetCurrentAccountPermission } from "@/services/api/user-permission";
import { IUserInfo } from "@/services/dtos/login";
import { IUserDataItem } from "@/services/dtos/user";
import { IMinePermissionResponse } from "@/services/dtos/user-permission";

import { FrontRolePermissionEnum } from "../user/user-permissions/user-newpermissions/props";

export const useAction = () => {
  const { signIn, setCurrentTeam } = useAuth();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const { state: historyState } = useLocation();

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userName: "",
    password: "",
  });

  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const updateUserInfo = (k: keyof IUserInfo, v: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  const historyCallback = () => {
    historyState?.from?.pathname
      ? navigate(historyState.from.pathname, { replace: true })
      : navigate("/", { replace: true });
  };

  const handleRemoveLocalStorage = () => {
    localStorage.removeItem(
      (window as any).appSettings?.tokenKey ?? "tokenKey"
    );

    localStorage.removeItem((window as any).appSettings?.userNameKey);
  };

  // 获取当前账号在团队中的权限
  const getCurrentPermission = (
    TeamId: string
  ): Promise<IMinePermissionResponse> => {
    return new Promise((resolve, reject) => {
      GetCurrentAccountPermission({ TeamId: TeamId })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);

          message.error(`获取权限失败：${(err as Error).message}`);
          handleRemoveLocalStorage();
        });
    });
  };

  // 获取当前账号信息，拿id
  const getCurrentAccount = (): Promise<{ userProfile: IUserDataItem }> => {
    return new Promise((resolve, reject) => {
      GetAccountInfoApi({})
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          message.error(`获取账号信息失败：${(err as Error).message}`);
          handleRemoveLocalStorage();
        });
    });
  };

  const judgeAdmin = () => {
    if (userInfo.userName.toLowerCase() === "admin") {
      setLoginLoading(false);

      localStorage.setItem("backstage", "superAdmin");

      signIn(
        localStorage.getItem(
          (window as any).appSettings?.tokenKey ?? "tokenKey"
        ) || "",
        historyCallback
      );
    } else {
      localStorage.setItem("backstage", "admin");

      GetTeamsMineApi({ UserProfileId: "" })
        .then((mineTeamsResponse) => {
          const filterTeams = mineTeamsResponse.filter(
            (item) => !isEmpty(item.id) && !isNil(item.id)
          );

          if (isEmpty(filterTeams)) {
            setLoginLoading(false);
            message.error("您未有加入任何團隊");
            handleRemoveLocalStorage();

            return;
          }
          Promise.all([
            getCurrentPermission(filterTeams[0].id),
            getCurrentAccount(),
          ])
            .then(([permissionResponse, accountInfoResponse]) => {
              const hasCameraAiBackEnd =
                permissionResponse?.rolePermissionData.some((item) =>
                  item.permissions.some(
                    (permission) =>
                      permission.name ===
                      FrontRolePermissionEnum.CanSwitchCameraAiBackEnd
                  )
                );

              if (hasCameraAiBackEnd) {
                signIn(
                  localStorage.getItem(
                    (window as any).appSettings?.tokenKey ?? "tokenKey"
                  ) || "",
                  historyCallback
                );

                setCurrentTeam(filterTeams[0]);

                localStorage.setItem(
                  "currentTeam",
                  JSON.stringify(filterTeams[0])
                );

                localStorage.setItem(
                  "currentAccount",
                  JSON.stringify(accountInfoResponse.userProfile)
                );
              } else {
                message.error(
                  `您在團隊【${filterTeams[0].name}】中没有访问後台权限`
                );
                handleRemoveLocalStorage();
              }
            })
            .finally(() => setLoginLoading(false));
        })
        .catch((err) => {
          setLoginLoading(false);
          message.error(`获取团队失败：${(err as Error).message}`);
          handleRemoveLocalStorage();
        });
    }
  };

  const onLogin = () => {
    setLoginLoading(true);

    if (
      userInfo.userName.trim().length !== 0 &&
      userInfo.password.trim().length !== 0
    ) {
      Login(userInfo)
        .then((res) => {
          if (res) {
            localStorage.setItem(
              (window as any).appSettings?.tokenKey ?? "tokenKey",
              res
            );

            localStorage.setItem(
              (window as any).appSettings?.userNameKey,
              userInfo.userName
            );

            judgeAdmin();
          }
        })
        .catch((err) => {
          setLoginLoading(false);

          message.error(`登录失败，请重试：${(err as Error).message}`);
        });
    } else {
      setLoginLoading(false);

      message.warning("请输入正确的用户名和密码");
    }
  };

  const { run: handleOnLogin } = useDebounceFn(onLogin, {
    wait: 300,
  });

  useEffect(() => {
    const token = localStorage.getItem((window as any).appSettings?.tokenKey);

    if (token) {
      signIn(token, historyCallback);
    }
  }, []);

  return { userInfo, loginLoading, updateUserInfo, handleOnLogin };
};
