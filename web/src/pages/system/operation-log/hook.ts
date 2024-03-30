import { useDebounce } from "ahooks";
import { message, TimeRangePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/operation-log-keys";
import { GetOperateLogsPage } from "@/services/api/operate-log";
import { IOperateLogsPageResponse } from "@/services/dtos/operate-log";

export const useAction = () => {
  const { t } = useAuth();

  const initOperateLogsDto = { count: 0, logs: [] };

  const [searchValue, setSearchValue] = useState<string>("");

  const filterKeyword = useDebounce(searchValue, { wait: 500 });

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [dateRange, setDateRange] = useState<(Dayjs | null)[]>([null, null]);

  const [operateLogsDto, setOperateLogsDto] =
    useState<IOperateLogsPageResponse>(initOperateLogsDto);

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    dates ? setDateRange([dates[0], dates[1]]) : setDateRange([null, null]);
  };

  const rangePresets: TimeRangePickerProps["presets"] = [
    {
      label: t(KEYS.LAST_WEEK),
      value: [dayjs().subtract(7, "d"), dayjs()],
    },
    {
      label: t(KEYS.LAST_MONTH),
      value: [dayjs().subtract(1, "month"), dayjs()],
    },
    {
      label: t(KEYS.LAST_THREE_MONTH),
      value: [dayjs().subtract(3, "month"), dayjs()],
    },
  ];

  const initGetLogsList = (
    PageIndex = pageDto.pageIndex,
    PageSize = pageDto.pageSize
  ) => {
    setIsTableLoading(true);
    GetOperateLogsPage({
      PageIndex,
      PageSize,
      StartTime: dateRange[0] ? dayjs(dateRange[0]).toISOString() : null,
      EndTime: dateRange[1] ? dayjs(dateRange[1]).toISOString() : null,
      Keyword: filterKeyword,
    })
      .then((res) => {
        if (res) setOperateLogsDto({ count: res.count, logs: res.logs });
      })
      .catch((err) => {
        setOperateLogsDto(initOperateLogsDto);
        message.error(err);
      })
      .finally(() => setIsTableLoading(false));
  };

  const onChangePage = (page: number, pageSize: number) => {
    setPageDto({ pageIndex: page, pageSize: pageSize });
    initGetLogsList(page, pageSize);
  };

  useEffect(() => {
    setPageDto((prev) => ({ ...prev, pageIndex: 1 }));
    initGetLogsList(1);
  }, [dateRange[0], dateRange[1], filterKeyword]);

  return {
    searchValue,
    isTableLoading,
    pageDto,
    setSearchValue,
    onChangePage,
    setIsTableLoading,
    rangePresets,
    onRangeChange,
    t,
    dateRange,
    operateLogsDto,
  };
};
