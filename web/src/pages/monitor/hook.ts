import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";

import { IMonitorOptionDto, IOpenOrStopStatus } from "./props";
import {
  GetMonitorSettingPage,
  MonitorSettingDelete,
  MonitorSettingDisable,
  MonitorSettingEnable,
} from "@/services/api/monitor";
import { IPageDto } from "@/services/dtos/public";
import {
  IMonitorSettingRequest,
  IMonitorSettingsDto,
} from "@/services/dtos/monitor";
import { App } from "antd";
import { clone } from "ramda";

export const useAction = () => {
  const { t, language } = useAuth();

  const { message } = App.useApp();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [filterStatus, setFilterStatus] = useState<
    IOpenOrStopStatus | undefined
  >(undefined);

  const [pageDto, setPageDto] = useState<IPageDto>({
    PageSize: 10,
    PageIndex: 1,
  });

  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  const [selectWarningType, setSelectWarningType] = useState<
    IMonitorOptionDto[] | undefined
  >(undefined);

  const [data, setData] = useState<IMonitorSettingsDto[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);

  const source = { ns: "monitor" };

  const onChangeStatus = (id: number, value: boolean) => {
    const newList = clone(data);
    newList.map((item) => {
      if (item.id === id) {
        item.loading = true;
      }
      return item;
    });
    setData(newList);

    value
      ? MonitorSettingEnable({ settingId: id })
          .then(() => {
            initGetPageData();
          })
          .catch((err) => {
            message.error(`绑定失败:${err}`);
          })
      : MonitorSettingDisable({ settingId: id })
          .then(() => {
            initGetPageData();
          })
          .catch((err) => {
            message.error(`解绑失败:${err}`);
          });
  };

  const onFilterStatus = (value: IOpenOrStopStatus) => {
    if (value !== IOpenOrStopStatus.None) {
      setFilterStatus(value);
      setIsActive(value === IOpenOrStopStatus.Enable);
    } else {
      setIsActive(undefined);
      setFilterStatus(undefined);
    }
  };

  const onFilterType = (value: IMonitorOptionDto[]) => {
    setSelectWarningType(value);
  };

  const initGetPageData = () => {
    const data: IMonitorSettingRequest = {
      PageSize: pageDto.PageSize,
      PageIndex: pageDto.PageIndex,
    };

    if (isActive !== undefined) {
      data.IsActive = isActive;
    }

    if (selectWarningType) {
      const list = selectWarningType.map((item) => item.value);
      data.MonitorType = list;
    }

    GetMonitorSettingPage(data)
      .then((res) => {
        setCount(res.count);
        setData(res.monitorSettings);
      })
      .catch((err) => {
        message.error(err);
        setCount(0);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  const onDelete = () => {
    setLoading(true);
    MonitorSettingDelete({ settingId: isDeleteIndex })
      .then(() => {
        setIsDeleteOpen(false);
        setLoading(true);
        initGetPageData();
      })
      .catch((err) => {
        message.error(`删除失败：${err}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    initGetPageData();
  }, [pageDto, isActive, selectWarningType]);

  return {
    data,
    isDeleteOpen,
    setIsDeleteOpen,
    setIsDeleteIndex,
    onChangeStatus,
    t,
    source,
    language,
    onFilterStatus,
    onFilterType,
    filterStatus,
    pageDto,
    setPageDto,
    count,
    onDelete,
    loading,
    selectWarningType,
  };
};
