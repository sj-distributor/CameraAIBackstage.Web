import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetCurrentAccountPermission } from "@/services/api/user-permission";
import { Spin } from "antd";
import { FrontRolePermissionEnum } from "../user/user-permissions/user-newpermissions/props";

export const Container = () => {
  const [permission, setPermission] = useState<{
    isGetPermission: boolean;
    hasSwitchCameraAiBackEnd: boolean;
  }>({
    isGetPermission: false,
    hasSwitchCameraAiBackEnd: false,
  });

  useEffect(() => {
    GetCurrentAccountPermission()
      .then((response) => {
        if (!response) return;

        setPermission((prevState) => ({
          ...prevState,
          isGetPermission: true,
          hasSwitchCameraAiBackEnd: response.rolePermissionData.some((item) =>
            item.permissions.some(
              (permission) =>
                permission.name ===
                FrontRolePermissionEnum.CanSwitchCameraAiBackEnd
            )
          ),
        }));
      })
      .catch(() => {
        setPermission({
          isGetPermission: true,
          hasSwitchCameraAiBackEnd: false,
        });
      });
  }, []);

  return (
    <div className="pt-6 px-6 flex-1 flex flex-col bg-[#F6F8FC] overflow-hidden">
      <Outlet />
      {permission.isGetPermission ? (
        permission.hasSwitchCameraAiBackEnd ? (
          <Outlet />
        ) : (
          <div className="flex justify-center font-semibold">暂无权限</div>
        )
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Spin />
        </div>
      )}
    </div>
  );
};
