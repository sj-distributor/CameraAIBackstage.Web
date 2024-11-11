import { useDebounceFn } from "ahooks";
import { App } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { Login } from "@/services/api/login";
import { IUserInfo } from "@/services/dtos/login";
import { GetRoles } from "@/services/api/user-permission";
import { RoleSystemSourceEnum } from "@/services/dtos/user-permission";
import { PermissionEnum } from "@/services/dtos/public";

export const useAction = () => {
  const { signIn } = useAuth();

  const { message } = App.useApp();

  const navigate = useNavigate();

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

  const hanldeNoPermission = () => {
    message.error("您没有访问权限");

    localStorage.removeItem(
      (window as any).appsettings?.tokenKey ?? "tokenKey"
    );

    localStorage.removeItem((window as any).appsettings?.userNameKey);
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
              (window as any).appsettings?.tokenKey ?? "tokenKey",
              res
            );
            localStorage.setItem(
              (window as any).appsettings?.userNameKey,
              userInfo.userName
            );

            GetRoles({
              PageIndex: 1,
              PageSize: 2147483647,
              systemSource: RoleSystemSourceEnum.CameraAi,
            })
              .then((rolesRes) => {
                if (!rolesRes) return;

                if (
                  !rolesRes.rolePermissionData.some((item) =>
                    item.role?.name?.includes(PermissionEnum.CameraAiUser)
                  )
                ) {
                  message.success("登录成功");
                  navigate("/user/list");

                  signIn(
                    localStorage.getItem(
                      (window as any).appsettings?.tokenKey ?? "tokenKey"
                    ) || ""
                  );
                } else {
                  hanldeNoPermission();
                }
              })
              .catch(() => {
                hanldeNoPermission();
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

  return { userInfo, loginLoading, updateUserInfo, handleOnLogin };
};
