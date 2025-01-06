import { App, Form } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GetRegionPage } from "@/services/api/equipment/list";

import { IUserInfoProps } from ".";

export const useAction = () => {
  const { message } = App.useApp();

  const location = useLocation();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const userInfoRecord = location.state.record || {};

  const [selectLoading, setSelectLoading] = useState<boolean>(false);

  const [selectRange, setSelectRange] = useState<number[]>([]);

  const [regionData, setRegionData] = useState<
    { value: number; label: string }[]
  >([]);

  const userInfo: IUserInfoProps[] = [
    {
      label: "用户ID",
      value: userInfoRecord?.id ?? "",
    },
    {
      label: "用戶名",
      value: userInfoRecord?.name ?? "",
    },
    {
      label: "部門",
      value: userInfoRecord?.department ?? "",
    },
    {
      label: "組別",
      value: userInfoRecord?.group ?? "",
    },
    {
      label: "崗位",
      value: userInfoRecord?.position ?? "",
    },
    {
      label: "是否在職",
      value: userInfoRecord?.positionStatus ?? "",
    },
    {
      label: "電話",
      value: userInfoRecord?.phone ?? "",
    },
    {
      label: "企業微信",
      value: userInfoRecord?.wechatName ?? "",
    },
    {
      label: "關聯郵箱",
      value: userInfoRecord?.email ?? "",
    },
  ];

  const filterOption = (
    input: string,
    option?: {
      label?: string;
      value: number | string;
    }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      console.log(values);
    });
  };

  const getRegions = () => {
    setSelectLoading(true);

    GetRegionPage({})
      .then((res) => {
        const data = [
          { value: -1, label: "不查看任何區域地址" },
          ...(res?.regions ?? []).map((item) => ({
            value: item.areaId,
            label: item.areaName,
          })),
        ];

        setRegionData(data);

        setSelectRange([-1]);
      })
      .catch((err) => {
        setRegionData([{ value: -1, label: "不查看任何區域地址" }]);

        message.error(`获取数据失败：${(err as Error).message}`);
      })
      .finally(() => setSelectLoading(false));
  };

  useEffect(() => {
    getRegions();
  }, []);

  return {
    form,
    selectLoading,
    selectRange,
    regionData,
    userInfo,
    navigate,
    setSelectRange,
    filterOption,
    onSubmit,
  };
};
