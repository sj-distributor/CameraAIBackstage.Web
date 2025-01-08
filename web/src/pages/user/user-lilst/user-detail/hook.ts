import { App, Form } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-list-keys";
import { GetRegionPage } from "@/services/api/equipment/list";

interface IUserInfoProps {
  label: string;
  value: string;
}

export const useAction = () => {
  const { message } = App.useApp();

  const location = useLocation();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { t, currentTeam } = useAuth();

  const userInfoRecord = location.state.record || {};

  const [selectLoading, setSelectLoading] = useState<boolean>(false);

  const [selectRange, setSelectRange] = useState<number[]>([]);

  const [regionData, setRegionData] = useState<
    { value: number; label: string }[]
  >([]);

  const userInfo: IUserInfoProps[] = [
    {
      label: t(KEYS.USER_ID, { ns: "userList" }),
      value: userInfoRecord?.id ?? "",
    },
    {
      label: t(KEYS.NAME, { ns: "userList" }),
      value: userInfoRecord?.name ?? "",
    },
    {
      label: t(KEYS.DEPARTMENT, { ns: "userList" }),
      value: userInfoRecord?.department ?? "",
    },
    {
      label: t(KEYS.GROUP, { ns: "userList" }),
      value: userInfoRecord?.group ?? "",
    },
    {
      label: t(KEYS.POSITION, { ns: "userList" }),
      value: userInfoRecord?.position ?? "",
    },
    {
      label: t(KEYS.POSITION_STATUS, { ns: "userList" }),
      value: userInfoRecord?.positionStatus ?? "",
    },
    {
      label: t(KEYS.PHONE, { ns: "userList" }),
      value: userInfoRecord?.phone ?? "",
    },
    {
      label: t(KEYS.WECHAT_NAME, { ns: "userList" }),
      value: userInfoRecord?.wechatName ?? "",
    },
    {
      label: t(KEYS.EMAIL, { ns: "userList" }),
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

    GetRegionPage({ TeamId: currentTeam.id })
      .then((res) => {
        const data = [
          { value: -1, label: t(KEYS.NO_VIEW_RANGE, { ns: "userList" }) },
          ...(res?.regions ?? []).map((item) => ({
            value: item.areaId,
            label: item.areaName,
          })),
        ];

        setRegionData(data);

        setSelectRange([-1]);
      })
      .catch((err) => {
        setRegionData([
          { value: -1, label: t(KEYS.NO_VIEW_RANGE, { ns: "userList" }) },
        ]);

        message.error(`获取数据失败：${(err as Error).message}`);
      })
      .finally(() => setSelectLoading(false));
  };

  useEffect(() => {
    getRegions();
  }, []);

  return {
    t,
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
