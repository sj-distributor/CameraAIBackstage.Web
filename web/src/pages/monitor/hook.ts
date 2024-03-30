import { App } from "antd";
import { clone } from "ramda";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  GetMonitorSettingPage,
  MonitorSettingDelete,
  MonitorSettingDisable,
  MonitorSettingEnable,
} from "@/services/api/monitor";
import {
  CameraAiMonitorType,
  IMonitorSettingRequest,
  IMonitorSettingsDto,
} from "@/services/dtos/monitor";
import { IPageDto } from "@/services/dtos/public";

import { IMonitorOptionDto, IOpenOrStopStatus } from "./props";

export const useAction = () => {
  const { t, language, myPermissions } = useAuth();

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
    if (value.some((x) => x.value === CameraAiMonitorType.All)) {
      setSelectWarningType(undefined);

      return;
    }
    setSelectWarningType(value);
  };

  const initGetPageData = (
    PageIndex = pageDto.PageIndex,
    PageSize = pageDto.PageSize
  ) => {
    const data: IMonitorSettingRequest = {
      PageIndex,
      PageSize,
    };

    if (isActive !== undefined) {
      data.IsActive = isActive;
    }

    if (selectWarningType) {
      data.MonitorType = selectWarningType.map((item) => item.value);
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

  const onChangePage = (page: number, pageSize: number) => {
    setPageDto({ PageIndex: page, PageSize: pageSize });
    setLoading(true);
    initGetPageData(page, pageSize);
  };

  useEffect(() => {
    setLoading(true);
    setPageDto((prev) => ({ ...prev, PageIndex: 1 }));
    initGetPageData(1);
  }, [isActive, selectWarningType]);

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
    myPermissions,
    pageDto,
    onChangePage,
    setPageDto,
    count,
    onDelete,
    loading,
    selectWarningType,
  };
};
