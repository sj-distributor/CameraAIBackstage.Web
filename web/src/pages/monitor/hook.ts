import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/hooks/use-auth";

import { IOpenOrStopStatus, IOptionDto } from "./props";
import {
  GetMonitorSettingPage,
  GetMonitorType,
  MonitorSettingDelete,
  MonitorSettingDisable,
  MonitorSettingEnable,
} from "@/services/api/monitor";
import { IPageDto } from "@/services/dtos/public";
import {
  IMonitorSettingRequest,
  IMonitorSettingsDto,
  IMonitorTypeResponse,
} from "@/services/dtos/monitor";
import { App } from "antd";

export const useAction = () => {
  const { t, language } = useAuth();

  const { message } = App.useApp();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const [isDeleteIndex, setIsDeleteIndex] = useState<number>(0);

  const [filterStatus, setFilterStatus] = useState<IOpenOrStopStatus>(
    IOpenOrStopStatus.None
  );

  const [pageDto, setPageDto] = useState<IPageDto>({
    PageSize: 10,
    PageIndex: 1,
  });

  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  const [selectWarningTypeId, setSelectWarningTypeId] = useState<
    number | undefined
  >(undefined);

  const [warningTypeData, setWarningTypeData] = useState<
    IMonitorTypeResponse[]
  >([]);

  const warningTypeDataList: IOptionDto[] = useMemo(() => {
    const list = warningTypeData.map((item) => {
      return { lable: item.id, value: item.name };
    });
    list.unshift({ value: "全部", lable: -1 });
    return list;
  }, [warningTypeData]);

  const [data, setData] = useState<IMonitorSettingsDto[]>([]);

  const [count, setCount] = useState<number>(0);

  const source = { ns: "monitor" };

  const onChangeStatus = (id: number, value: boolean) => {
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
    }
  };

  const onFilterType = (value: number) => {
    setSelectWarningTypeId(value);
  };

  const initGetPageData = () => {
    const data: IMonitorSettingRequest = {
      PageSize: pageDto.PageSize,
      PageIndex: pageDto.PageIndex,
    };

    if (isActive !== undefined) {
      data.IsActive = isActive;
    }

    if (selectWarningTypeId) {
      data.MonitorTypeId =
        selectWarningTypeId === -1 ? undefined : selectWarningTypeId;
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
      });
  };

  const onDelete = () => {
    MonitorSettingDelete({ settingId: isDeleteIndex })
      .then(() => {
        setIsDeleteOpen(false);
        initGetPageData();
      })
      .catch((err) => {
        message.error(`删除失败：${err}`);
      });
  };

  useEffect(() => {
    initGetPageData();
  }, [pageDto, isActive, selectWarningTypeId]);

  useEffect(() => {
    GetMonitorType()
      .then((res) => {
        setWarningTypeData(res);
      })
      .catch(() => {
        setWarningTypeData([]);
      });
  }, []);

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
    warningTypeDataList,
    selectWarningTypeId,
    count,
    onDelete,
  };
};
