import { message } from "antd";
import { CheckboxProps } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-permissions-keys";
import { GetRolePermissionByRoleId } from "@/services/api/user-permission";
import {
  IRole,
  IRolePermissionByRoleIdResponse,
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

  const [rolePermissionByRoleIdData, setRolePermissionByRoleIdData] =
    useState<IRolePermissionByRoleIdResponse>(initRolePermissionByRoleIdData);

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
            },
          }));
        break;

      case "roleUsers":
        setRolePermissionByRoleIdData((preValue) => ({
          ...preValue,
          roleUsers: [
            ...(value as string[])
              .filter((x) => !x.includes("-"))
              .map((item) => ({
                userId: item,
              })),
          ],
        }));
        break;

      case "rolePermissions":
        setRolePermissionByRoleIdData((preValue) => ({
          ...preValue,
          rolePermissions: formatRolePermission(value as CheckboxValueType[]),
        }));

        break;

      case "rolePermissionsUserIds":
        setRolePermissionByRoleIdData((preValue) => {
          return {
            ...preValue,
            rolePermissionUsers: [
              {
                userIds: (value as string[]).filter((x) => !x.includes("-")),
              },
            ],
          };
        });
        break;

      default:
        break;
    }
  };

  const formatRolePermission = (list: CheckboxValueType[]) =>
    list.map((item) => ({
      permissionId: Number(item),
      userIds: rolePermissionByRoleIdData.rolePermissionUsers
        ? rolePermissionByRoleIdData?.rolePermissionUsers[0]?.userIds
        : [],
    }));

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

  const frontendOptionsList = [
    {
      optionName: "homePageList",
      option: [
        {
          label: t(KEYS.DASHBOARD, source),
          value: "首页",
        },
        {
          label: t(KEYS.SWITCH_BACKGROUND, source),
          value: "切換後台",
        },
      ],
    },
    {
      optionName: "monitor",
      option: [
        {
          label: t(KEYS.REAL_TIME_MONITORING, source),
          value: "實時監控",
        },
        {
          label: t(KEYS.EXPORT, source),
          value: "導出",
        },
      ],
    },
    {
      optionName: "videoPlayback",
      option: [
        {
          label: t(KEYS.VIDEO_PLAYBACK, source),
          value: "視頻回放",
        },
        {
          label: t(KEYS.EXPORT, source),
          value: "導出",
        },
      ],
    },
    {
      optionName: "alertList",
      option: [
        {
          label: t(KEYS.WARNING_LIST, source),
          value: "預警列表",
        },
        {
          label: t(KEYS.EXPORT, source),
          value: "導出",
        },
        {
          label: t(KEYS.VIEW_DETAILS, source),
          value: "查看詳情",
        },
        {
          label: t(KEYS.LABELED, source),
          value: "標記",
        },
      ],
    },
    {
      optionName: "feedbackList",
      option: [
        {
          label: t(KEYS.FEEDBACK_LIST, source),
          value: "反饋列表",
        },
        {
          label: t(KEYS.EXPORT, source),
          value: "導出",
        },
        {
          label: t(KEYS.VIEW_DETAILS, source),
          value: "查看詳情",
        },
      ],
    },
  ];

  const backendOptionsList = [
    {
      optionName: "userList",
      option: [
        {
          label: t(KEYS.ROLE_LIST, source),
          value: "用戶列表",
        },
        {
          label: t(KEYS.ADD_USER, source),
          value: "添加用戶",
        },
        {
          label: t(KEYS.DELETE_USERS_IN_BATCHES, source),
          value: "批量移除",
        },
        {
          label: t(KEYS.ENABLE, source),
          value: "啟用",
        },
        {
          label: t(KEYS.DISABLE, source),
          value: "停用",
        },
        {
          label: t(KEYS.RESET_PASSWORDS, source),
          value: "重置密碼",
        },
        {
          label: t(KEYS.REMOVE, source),
          value: "移除",
        },
      ],
    },
    {
      optionName: "permissionsList",
      option: [
        {
          label: t(KEYS.ROLE_PERMISSION, source),
          value: "角色權限",
        },
        {
          label: t(KEYS.ADD_ROLE, source),
          value: "新增角色",
        },
        {
          label: t(KEYS.ALLOT, source),
          value: "分配",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "删除",
        },
      ],
    },
    {
      optionName: "deviceList",
      option: [
        {
          label: t(KEYS.DEVICE_LIST, source),
          value: "設備列表",
        },
        {
          label: t(KEYS.ADD_DEVICE, source),
          value: "添加設備",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
        },
        {
          label: t(KEYS.BINGDING, source),
          value: "綁定",
        },
        {
          label: t(KEYS.REMOVE_BINDING, source),
          value: "解除綁定",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
        },
      ],
    },
    {
      optionName: "equipmentType",
      option: [
        {
          label: t(KEYS.DEVICE_TYPE, source),
          value: "設備類型",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
        },
      ],
    },
    {
      optionName: "monitorSet",
      option: [
        {
          label: t(KEYS.MONITORING_MANAGEMENT, source),
          value: "監測管理",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
        },
        {
          label: t(KEYS.ENABLE, source),
          value: "啟用",
        },
        {
          label: t(KEYS.CLOSURE, source),
          value: "關閉",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
        },
      ],
    },
    {
      optionName: "portraitSet",
      option: [
        {
          label: t(KEYS.LIST_OF_PORTRAITS, source),
          value: "人像管理",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
        },
      ],
    },
    {
      optionName: "licensePlateSet",
      option: [
        {
          label: t(KEYS.LICENCE_PLATE_MANAGEMENT, source),
          value: "車牌管理",
        },
        {
          label: t(KEYS.REGISTERED_VEHICLE, source),
          value: "已登記車輛",
        },
        {
          label: t(KEYS.REGISTER, source),
          value: "登記",
        },
        {
          label: t(KEYS.DETAILS, source),
          value: "詳情",
        },
      ],
    },
    {
      optionName: "areaSet",
      option: [
        {
          label: t(KEYS.DISTRICT_MANAGEMENT, source),
          value: "區域管理",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
        },
      ],
    },
  ];

  useEffect(() => {
    id && id !== "new" && onGetRoleDetail();
  }, []);

  return {
    AddRoleName,
    checkList,
    setCheckList,
    handleCheckBox,
    frontendOptionsList,
    backendOptionsList,
    navigate,
    t,
    source,
    language,
    rolePermissionByRoleIdData,
    onChangeRoleData,
  };
};
