import { useDebounceFn } from "ahooks";
import { App } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { Login } from "@/services/api/login";
import { GetCurrentAccountPermission } from "@/services/api/user-permission";
import { IUserInfo } from "@/services/dtos/login";

import { FrontRolePermissionEnum } from "../user/user-permissions/user-newpermissions/props";

export const useAction = () => {
  const { signIn } = useAuth();

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

  const handleNoPermission = () => {
    message.error("您没有访问後台权限");

    localStorage.removeItem(
      (window as any).appSettings?.tokenKey ?? "tokenKey"
    );

    localStorage.removeItem((window as any).appSettings?.userNameKey);
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

            GetCurrentAccountPermission()
              .then((response) => {
                if (
                  response.rolePermissionData.some((item) =>
                    item.permissions.some(
                      (permission) =>
                        permission.name ===
                        FrontRolePermissionEnum.CanSwitchCameraAiBackEnd
                    )
                  )
                ) {
                  message.success("登录成功");

                  signIn(
                    localStorage.getItem(
                      (window as any).appSettings?.tokenKey ?? "tokenKey"
                    ) || "",
                    historyCallback
                  );
                } else {
                  handleNoPermission();
                }
              })
              .catch(() => {
                handleNoPermission();
              });
          }
        })
        .catch(() => {
          message.error("登录失败，请重试");
        })
        .finally(() => setLoginLoading(false));
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
