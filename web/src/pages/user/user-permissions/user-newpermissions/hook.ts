import { CheckboxProps } from "antd/es/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

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
          label: "首页",
          value: "首页",
        },
        {
          label: "切换后台",
          value: "切換後台",
        },
      ],
    },
    {
      optionName: "monitor",
      option: [
        {
          label: "實時監控",
          value: "實時監控",
        },
        {
          label: "導出",
          value: "導出",
        },
      ],
    },
    {
      optionName: "videoPlayback",
      option: [
        {
          label: "視頻回放",
          value: "視頻回放",
        },
        {
          label: "導出",
          value: "導出",
        },
      ],
    },
    {
      optionName: "alertList",
      option: [
        {
          label: "預警列表",
          value: "預警列表",
        },
        {
          label: "導出",
          value: "導出",
        },
        {
          label: "查看詳情",
          value: "查看詳情",
        },
        {
          label: "標記",
          value: "標記",
        },
      ],
    },
    {
      optionName: "feedbackList",
      option: [
        {
          label: "反饋列表",
          value: "反饋列表",
        },
        {
          label: "導出",
          value: "導出",
        },
        {
          label: "查看詳情",
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
          label: "用戶列表",
          value: "用戶列表",
        },
        {
          label: "添加用戶",
          value: "添加用戶",
        },
        {
          label: "批量移除",
          value: "批量移除",
        },
        {
          label: "啟用",
          value: "啟用",
        },
        {
          label: "停用",
          value: "停用",
        },
        {
          label: "重置密碼",
          value: "重置密碼",
        },
        {
          label: "移除",
          value: "移除",
        },
      ],
    },
    {
      optionName: "permissionsList",
      option: [
        {
          label: "角色權限",
          value: "角色權限",
        },
        {
          label: "新增角色",
          value: "新增角色",
        },
        {
          label: "分配",
          value: "分配",
        },
        {
          label: "編輯",
          value: "編輯",
        },
        {
          label: "删除",
          value: "删除",
        },
      ],
    },
    {
      optionName: "deviceList",
      option: [
        {
          label: "設備列表",
          value: "設備列表",
        },
        {
          label: "添加設備",
          value: "添加設備",
        },
        {
          label: "編輯",
          value: "編輯",
        },
        {
          label: "綁定",
          value: "綁定",
        },
        {
          label: "解除綁定",
          value: "解除綁定",
        },
        {
          label: "刪除",
          value: "刪除",
        },
      ],
    },
    {
      optionName: "equipmentType",
      option: [
        {
          label: "設備類型",
          value: "設備類型",
        },
        {
          label: "新增",
          value: "新增",
        },
        {
          label: "編輯",
          value: "編輯",
        },
        {
          label: "刪除",
          value: "刪除",
        },
      ],
    },
    {
      optionName: "monitorSet",
      option: [
        {
          label: "監測管理",
          value: "監測管理",
        },
        {
          label: "新增",
          value: "新增",
        },
        {
          label: "啟用",
          value: "啟用",
        },
        {
          label: "關閉",
          value: "關閉",
        },
        {
          label: "編輯",
          value: "編輯",
        },
        {
          label: "刪除",
          value: "刪除",
        },
      ],
    },
    {
      optionName: " portraitSet",
      option: [
        {
          label: "人像管理",
          value: "人像管理",
        },
        {
          label: "新增",
          value: "新增",
        },
        {
          label: "編輯",
          value: "編輯",
        },
        {
          label: "刪除",
          value: "刪除",
        },
      ],
    },
    {
      optionName: "licensePlateSet",
      option: [
        {
          label: "車牌管理",
          value: "車牌管理",
        },
        {
          label: "已登記車輛",
          value: "已登記車輛",
        },
        {
          label: "登記",
          value: "登記",
        },
        {
          label: "詳情",
          value: "詳情",
        },
      ],
    },
    {
      optionName: "areaSet",
      option: [
        {
          label: "區域管理",
          value: "區域管理",
        },
        {
          label: "新增",
          value: "新增",
        },
        {
          label: "編輯",
          value: "編輯",
        },
        {
          label: "刪除",
          value: "刪除",
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
