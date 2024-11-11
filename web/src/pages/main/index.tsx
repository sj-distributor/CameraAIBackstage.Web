import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetRoles } from "@/services/api/user-permission";
import { RoleSystemSourceEnum } from "@/services/dtos/user-permission";
import { Spin } from "antd";
import { PermissionEnum } from "@/services/dtos/public";

export const Container = () => {
  const [permission, setPermission] = useState<{
    isGetPermission: boolean;
    hasPermision: boolean;
  }>({
    isGetPermission: false,
    hasPermision: false,
  });

  useEffect(() => {
    GetRoles({
      PageIndex: 1,
      PageSize: 2147483647,
      systemSource: RoleSystemSourceEnum.CameraAi,
    })
      .then((res) => {
        setPermission((prevState) => ({
          ...prevState,
          isGetPermission: true,
          hasPermision: res.rolePermissionData.some((item) =>
            item.role?.name?.includes(PermissionEnum.CameraAiUser)
          ),
        }));
      })
      .catch(() => {
        setPermission({
          isGetPermission: true,
          hasPermision: false,
        });
      });
  }, []);

  return (
    <div className="pt-6 px-6 flex-1 flex flex-col bg-[#F6F8FC] overflow-hidden">
      {permission.isGetPermission ? (
        permission.hasPermision ? (
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
