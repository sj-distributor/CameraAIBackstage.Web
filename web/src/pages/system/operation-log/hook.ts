import { message, TimeRangePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { GetOperateLogsPage } from "@/services/api/operate-log";
import { ILogsDto } from "@/services/dtos/operate-log";

export const useAction = () => {
  const { t } = useAuth();

  const [searchValue, setSearchValue] = useState<string>("");

  const [searchKeywordValue, setSearchKeywordValue] = useState<string>("");

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [dateRange, setDateRange] = useState<(Dayjs | null)[]>([null, null]);

  const [operateLogsCount, setOperateLogsCount] = useState<number>(0);

  const [operateLogsList, setOperateLogsList] = useState<ILogsDto[]>([]);

  const onRangeChange = (dates: (Dayjs | null)[]) => {
    dates ? setDateRange([dates[0], dates[1]]) : setDateRange([null, null]);
  };

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "最近一週", value: [dayjs().subtract(7, "d"), dayjs()] },
    {
      label: "最近一個月",
      value: [dayjs().subtract(1, "month"), dayjs()],
    },
    { label: "最近三個月", value: [dayjs().subtract(3, "month"), dayjs()] },
  ];

  const initGetLogsList = () => {
    setIsTableLoading(true);
    GetOperateLogsPage({
      PageIndex: pageDto.pageIndex,
      PageSize: pageDto.pageSize,
      StartTime: dateRange[0] ? dayjs(dateRange[0]).toISOString() : null,
      EndTime: dateRange[1] ? dayjs(dateRange[1]).toISOString() : null,
      Keyword: searchKeywordValue,
    })
      .then((res) => {
        setOperateLogsList(res.logs);
        setOperateLogsCount(res.count);
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsTableLoading(false));
  };

  useEffect(() => {
    if (searchValue === "") setSearchKeywordValue("");
  }, [searchValue]);

  useEffect(() => {
    initGetLogsList();
  }, [
    pageDto.pageSize,
    pageDto.pageIndex,
    dateRange[0],
    dateRange[1],
    searchKeywordValue,
  ]);

  return {
    searchValue,
    isTableLoading,
    pageDto,
    setSearchValue,
    setPageDto,
    setIsTableLoading,
    rangePresets,
    onRangeChange,
    t,
    operateLogsCount,
    operateLogsList,
    setSearchKeywordValue,
    dateRange,
  };
};
