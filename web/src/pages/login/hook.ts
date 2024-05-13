import { useDebounceFn } from "ahooks";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { Login } from "@/services/api/login";
import { IUserInfo } from "@/services/dtos/login";

export const useAction = () => {
  const { signIn } = useAuth();

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

  const onLogin = () => {
    setLoginLoading(true);
    if (
      userInfo.userName.trim().length !== 0 &&
      userInfo.password.trim().length !== 0
    ) {
      Login(userInfo)
        .then((res) => {
          if (res) {
            message.success("登录成功");
            localStorage.setItem(
              (window as any).appsettings?.tokenKey ?? "tokenKey",
              res
            );
            localStorage.setItem(
              (window as any).appsettings?.userNameKey,
              userInfo.userName
            );

            navigate("/user/list");

            signIn(res);
          }
        })
        .catch(() => {
          message.error("登录失败，请重试");
        });
    } else {
      message.warning("请输入正确的用户名和密码");
    }

    setTimeout(() => {
      setLoginLoading(false);
    }, 1000);
  };

  const { run: handleOnLogin } = useDebounceFn(onLogin, {
    wait: 300,
  });

  return { userInfo, loginLoading, updateUserInfo, handleOnLogin };
};
