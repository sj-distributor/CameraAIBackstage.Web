import { message } from "antd";
import { CheckboxProps } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
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

export const useAction = () => {
  const { t, language } = useAuth();

  const { id } = useParams();

  const source = { ns: "userPermissions" };

  const [checkList, setCheckList] = useState([]);

  const navigate = useNavigate();

  const isCreate = window.location.pathname.includes("new");

  const [loaded, setIsLoaded] = useState<boolean>(isCreate);

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

  const [rolePermissions, setRolePermissions] = useState<CheckboxValueType[]>(
    []
  );

  const [roleFrontPermissions, setRoleFrontPermissions] = useState<
    CheckboxValueType[]
  >([]);

  const [roleBackgroundPermissions, setRoleBackgroundPermissions] = useState<
    CheckboxValueType[]
  >([]);

  console.log(rolePermissions);

  const AddRoleName = (e: []) => {
    console.log(e);
  };

  const handleCheckBox: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChangeRoleData = (
    field: "role" | "roleUsers" | "rolePermissions" | "rolePermissionsUserIds",
    value: number | string | string[] | CheckboxValueType[],
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
          rolePermissions: (value as CheckboxValueType[]).map((item) => ({
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

  const formatRolePermission = (list: CheckboxValueType[]) =>
    list.map((item) => ({
      permissionId: Number(item),
      userIds: [],
    }));

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
        message.error(error.msg);

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
      throw new Error("請確認所有數據填寫完整");
    }
  };

  const filterCreateOrUpdateParam = () => {
    const { role, roleUsers, rolePermissions, rolePermissionUsers } =
      rolePermissionByRoleIdData;

    const userIds = rolePermissionUsers ? rolePermissionUsers[0]?.userIds : [];

    const result = {
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
        setRolePermissionByRoleIdData(
          response ?? initRolePermissionByRoleIdData
        );
      })
      .catch((error) => {
        message.error(error.msg);

        setRolePermissionByRoleIdData(initRolePermissionByRoleIdData);
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
        message.success("创建成功");
        navigate("/permission/settings");
      })
      .catch((error) => {
        message.error(error.msg);
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
        message.success("更新成功");
        navigate("/permission/settings");
      })
      .catch((error) => {
        message.error(error.msg);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    id && id !== "new" && onGetRoleDetail();

    onGetPermission();
  }, []);

  useEffect(() => {
    setRolePermissions([...roleFrontPermissions, ...roleBackgroundPermissions]);
  }, [roleFrontPermissions, roleBackgroundPermissions]);

  useEffect(() => {
    onChangeRoleData("rolePermissions", rolePermissions);
  }, [rolePermissions]);

  return {
    AddRoleName,
    checkList,
    setCheckList,
    handleCheckBox,
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
    setRolePermissions,
    setRoleFrontPermissions,
    setRoleBackgroundPermissions,
  };
};
