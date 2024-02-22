import { useState } from "react";

export const useAction = () => {
  const onChange = (e: any) => {
    console.log(e);
  };

  const [checkList, setCheckList] = useState([]);

  const handleCheckBox = (checkedBox: any) => {
    setCheckList(checkedBox);
  };

  const homePageList = [
    {
      label: "首页",
      value: "首页",
    },
    {
      label: "切换后台",
      value: "切換後台",
    },
  ];

  const monitor = [
    {
      label: "實時監控",
      value: "實時監控",
    },
    {
      label: "導出",
      value: "導出",
    },
  ];

  const videoPlayback = [
    {
      label: "視頻回放",
      value: "視頻回放",
    },
    {
      label: "導出",
      value: "導出",
    },
  ];

  const alertList = [
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
  ];

  const feedbackList = [
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
  ];

  const userList = [
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
  ];

  const permissionsList = [
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
  ];

  const deviceList = [
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
  ];

  const equipmentType = [
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
  ];

  const monitorSet = [
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
  ];

  const portraitSet = [
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
  ];

  const licensePlateSet = [
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
  ];

  const areaSet = [
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
  ];

  return {
    onChange,
    checkList,
    setCheckList,
    handleCheckBox,
    homePageList,
    monitor,
    videoPlayback,
    alertList,
    feedbackList,
    userList,
    permissionsList,
    deviceList,
    equipmentType,
    monitorSet,
    portraitSet,
    licensePlateSet,
    areaSet,
  };
};
