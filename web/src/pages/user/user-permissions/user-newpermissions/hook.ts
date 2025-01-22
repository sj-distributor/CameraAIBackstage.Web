import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-permissions-keys";
import {
  GetPermission,
  GetRolePermissionByRoleId,
  PostCreateRoles,
  PostUpdateRoles,
} from "@/services/api/user-permission";
import {
  IPermissionResponse,
  IRole,
  IRolePermissionByRoleIdResponse,
  RoleSystemSourceEnum,
} from "@/services/dtos/user-permission";

import { BackGroundRolePermissionEnum, FrontRolePermissionEnum } from "./props";
import { useUpdateEffect } from "ahooks";

export const useAction = () => {
  const { t, language, currentTeam } = useAuth();

  const { id } = useParams();

  const source = { ns: "userPermissions" };

  const [checkList, setCheckList] = useState([]);

  const navigate = useNavigate();

  const isCreate = window.location.pathname.includes("new");

  const [isLoaded, setIsLoaded] = useState<boolean>(isCreate);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const initRolePermissionByRoleIdData: IRolePermissionByRoleIdResponse = {
    role: {
      name: "",
      description: "",
    },
    roleUsers: [],
    rolePermissions: [],
    rolePermissionUsers: [],
  };

  const initialPermissionData: IPermissionResponse = {
    count: 0,
    permissions: [],
  };

  const [rolePermissionByRoleIdData, setRolePermissionByRoleIdData] =
    useState<IRolePermissionByRoleIdResponse>(initRolePermissionByRoleIdData);

  const [permissionData, setPermissionData] = useState<IPermissionResponse>(
    initialPermissionData
  );

  const [permissionNoChangeData, setPermissionNoChangeData] =
    useState<IRolePermissionByRoleIdResponse>(initRolePermissionByRoleIdData);

  const [updateRolePermissions, setUpdateRolePermissions] = useState<number[]>(
    []
  );

  const [roleFrontPermissions, setRoleFrontPermissions] = useState<number[]>(
    []
  );

  const [roleBackgroundPermissions, setRoleBackgroundPermissions] = useState<
    number[]
  >([]);

  const onChangeRoleData = (
    field: "role" | "roleUsers" | "rolePermissions" | "rolePermissionsUserIds",
    value: number | string | string[] | number[],
    roleKey?: keyof IRole
  ) => {
    !isEdit && setIsEdit(true);

    switch (field) {
      case "role":
        roleKey &&
          setRolePermissionByRoleIdData((preValue) => ({
            ...preValue,
            role: {
              ...preValue.role,
              [roleKey]: value,
              systemSource: RoleSystemSourceEnum.CameraAi,
            },
          }));
        break;

      case "roleUsers":
        setRolePermissionByRoleIdData((preValue) => ({
          ...preValue,
          roleUsers: [],
        }));
        break;

      case "rolePermissions":
        setRolePermissionByRoleIdData((preValue) => ({
          ...preValue,
          rolePermissions: (value as number[]).map((item) => ({
            permissionId: Number(item),
            userIds: [],
          })),
        }));
        break;

      case "rolePermissionsUserIds":
        setRolePermissionByRoleIdData((preValue) => {
          return {
            ...preValue,
            rolePermissionUsers: [],
          };
        });
        break;

      default:
        break;
    }
  };

  const findCheckboxIdValue = (permissionName: string) => {
    const { permissions } = permissionData;

    if (permissions.length > 0) {
      const permission = permissions.find((x) => x.name === permissionName);

      return permission?.id;
    }

    return undefined;
  };

  const onGetPermission = () => {
    GetPermission()
      .then((response) =>
        setPermissionData(
          response.count > 0 && response.permissions.length > 0
            ? response
            : initialPermissionData
        )
      )
      .catch((error) => {
        message.error((error as Error).message);

        setPermissionData(initialPermissionData);
      });
  };

  const checkValue = () => {
    const { role, rolePermissions } = rolePermissionByRoleIdData;

    const valueNotEmpty = {
      roleName: !!role.name,
      roleDescription: !!role.description,
      rolePermissions: rolePermissions.length > 0,
    };

    if (Object.values(valueNotEmpty).some((value) => value === false)) {
      throw new Error(t(KEYS.PLEASE_MAKE_SURE_ALL_DATA_INPUT, source));
    }
  };

  const filterCreateOrUpdateParam = () => {
    const { role, roleUsers, rolePermissions, rolePermissionUsers } =
      rolePermissionByRoleIdData;

    const userIds = rolePermissionUsers ? rolePermissionUsers[0]?.userIds : [];

    const result = {
      teamId: currentTeam.id,
      role: {
        name: role.name,
        description: role.description,
        systemSource: RoleSystemSourceEnum.CameraAi,
      },
      roleUsers: roleUsers,
      rolePermissions:
        rolePermissions && rolePermissions.length > 0
          ? rolePermissions.map((item) => {
              return {
                permissionId: item.permissionId,
                userIds,
              };
            })
          : [
              {
                userIds,
              },
            ],
    };

    return result;
  };

  const onGetRoleDetail = () => {
    setIsLoaded(false);

    GetRolePermissionByRoleId(Number(id))
      .then((response) => {
        setPermissionNoChangeData(response);
        setRolePermissionByRoleIdData(
          response ?? initRolePermissionByRoleIdData
        );
      })
      .catch((error) => {
        message.error((error as Error).message);
        navigate("/user/permissions");
      })
      .finally(() => setIsLoaded(true));
  };

  const onCreateRole = () => {
    try {
      checkValue();
    } catch (error) {
      message.info((error as Error).message);

      return;
    }

    PostCreateRoles(filterCreateOrUpdateParam())
      .then(() => {
        message.success(t(KEYS.CREATED_SUCCESSFULLY, source));
      })
      .catch((error) => {
        message.error((error as Error).message);
      });
  };

  const onUpdateRole = () => {
    try {
      checkValue();
    } catch (error) {
      message.info((error as Error).message);

      return;
    }

    setIsLoaded(false);

    PostUpdateRoles({
      ...filterCreateOrUpdateParam(),
      role: {
        ...filterCreateOrUpdateParam().role,
        id: rolePermissionByRoleIdData.role.id,
      },
    })
      .then(() => {
        message.success(t(KEYS.UPDATE_SUCCESS, source));
      })
      .catch((error) => {
        message.error((error as Error).message);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    id && id !== "new" && onGetRoleDetail();

    onGetPermission();
  }, []);

  useEffect(() => {
    onChangeRoleData("rolePermissions", [
      ...roleFrontPermissions,
      ...roleBackgroundPermissions,
    ]);
  }, [roleFrontPermissions, roleBackgroundPermissions]);

  useEffect(() => {
    const frontPermission = permissionNoChangeData.rolePermissions.filter(
      (permission) => {
        return (
          Object.values(FrontRolePermissionEnum).includes(
            permission.permissionName as FrontRolePermissionEnum
          ) && permission
        );
      }
    );

    const backGroundPermission = permissionNoChangeData.rolePermissions.filter(
      (permission) => {
        return (
          Object.values(BackGroundRolePermissionEnum).includes(
            permission.permissionName as BackGroundRolePermissionEnum
          ) && permission
        );
      }
    );

    setRoleFrontPermissions(frontPermission.map((item) => item.permissionId!));

    setRoleBackgroundPermissions(
      backGroundPermission.map((item) => item.permissionId!)
    );
  }, [permissionNoChangeData.rolePermissions.length]);

  return {
    checkList,
    setCheckList,
    navigate,
    t,
    source,
    language,
    rolePermissionByRoleIdData,
    onChangeRoleData,
    findCheckboxIdValue,
    onCreateRole,
    onUpdateRole,
    isCreate,
    setUpdateRolePermissions,
    setRoleFrontPermissions,
    setRoleBackgroundPermissions,
    roleFrontPermissions,
    roleBackgroundPermissions,
    updateRolePermissions,
    isLoaded,
  };
};
