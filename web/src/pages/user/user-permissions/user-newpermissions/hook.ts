import { CheckboxProps } from "antd/es/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-permissions-keys";

export const useAction = () => {
  const { t, language } = useAuth();

  const source = { ns: "userPermissions" };

  const [checkList, setCheckList] = useState([]);

  const navigate = useNavigate();

  const AddRoleName = (e: []) => {
    console.log(e);
  };

  const handleCheckBox: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
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
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.ADD_USER, source),
          value: "添加用戶",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.DELETE_USERS_IN_BATCHES, source),
          value: "批量移除",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.ENABLE, source),
          value: "啟用",
          width: "w-[4rem]",
        },
        {
          label: t(KEYS.DISABLE, source),
          value: "停用",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.RESET_PASSWORDS, source),
          value: "重置密碼",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.REMOVE, source),
          value: "移除",
          width: "w-[8rem]",
        },
      ],
    },
    {
      optionName: "permissionsList",
      option: [
        {
          label: t(KEYS.ROLE_PERMISSION, source),
          value: "角色權限",
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.ADD_ROLE, source),
          value: "新增角色",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.ALLOT, source),
          value: "分配",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
          width: "w-[4rem]",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "删除",
          width: "w-[8rem]",
        },
      ],
    },
    {
      optionName: "deviceList",
      option: [
        {
          label: t(KEYS.DEVICE_LIST, source),
          value: "設備列表",
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.ADD_DEVICE, source),
          value: "添加設備",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.BINGDING, source),
          value: "綁定",
          width: "w-[4rem]",
        },
        {
          label: t(KEYS.REMOVE_BINDING, source),
          value: "解除綁定",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
          width: "w-[8rem]",
        },
      ],
    },
    {
      optionName: "equipmentType",
      option: [
        {
          label: t(KEYS.DEVICE_TYPE, source),
          value: "設備類型",
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
          width: "w-[4rem]",
        },
      ],
    },
    {
      optionName: "monitorSet",
      option: [
        {
          label: t(KEYS.MONITORING_MANAGEMENT, source),
          value: "監測管理",
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.ENABLE, source),
          value: "啟用",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.CLOSURE, source),
          value: "關閉",
          width: "w-[4rem]",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
          width: "w-[8rem]",
        },
      ],
    },
    {
      optionName: "portraitSet",
      option: [
        {
          label: t(KEYS.LIST_OF_PORTRAITS, source),
          value: "人像管理",
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
          width: "w-[4rem]",
        },
      ],
    },
    {
      optionName: "licensePlateSet",
      option: [
        {
          label: t(KEYS.LICENCE_PLATE_MANAGEMENT, source),
          value: "車牌管理",
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.REGISTERED_VEHICLE, source),
          value: "已登記車輛",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.REGISTER, source),
          value: "登記",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.DETAILS, source),
          value: "詳情",
          width: "w-[4rem]",
        },
      ],
    },
    {
      optionName: "areaSet",
      option: [
        {
          label: t(KEYS.DISTRICT_MANAGEMENT, source),
          value: "區域管理",
          width: "w-[13.5rem]",
        },
        {
          label: t(KEYS.ADD, source),
          value: "新增",
          width: "w-[9rem]",
        },
        {
          label: t(KEYS.EDIT, source),
          value: "編輯",
          width: "w-[8rem]",
        },
        {
          label: t(KEYS.DELETE, source),
          value: "刪除",
          width: "w-[4rem]",
        },
      ],
    },
  ];

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
  };
};
