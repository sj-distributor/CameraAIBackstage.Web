import { TableColumnsType, TimeRangePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { IOperationLogData } from "./props";

export const useAction = () => {
  const columns: TableColumnsType<IOperationLogData> = [
    {
      title: "序號",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: "13%",
    },
    {
      title: "用戶名",
      dataIndex: "userName",
      width: "11%",
    },
    {
      title: "操作內容",
      dataIndex: "operateContent",
      width: "51%",
    },
    {
      title: "操作時間",
      dataIndex: "OperateTime",
      width: "25%",
    },
  ];

  const data: IOperationLogData[] = [
    {
      id: 1,
      userName: "Jim Green",
      operateContent: "Janny创建了角色经理",
      OperateTime: "2023-09-26 12:30",
    },
    {
      id: 2,
      userName: "Jim Green",
      operateContent: "Janny创建了角色经理",
      OperateTime: "2023-09-26 12:30",
    },
    {
      id: 3,
      userName: "Jim Green",
      operateContent: "Janny创建了角色经理",
      OperateTime: "2023-09-26 12:30",
    },
    {
      id: 4,
      userName: "Jim Green",
      operateContent: "Janny创建了角色经理",
      OperateTime: "2023-09-26 12:30",
    },
  ];

  const [searchValue, setSearchValue] = useState<string>("");

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "最近一週", value: [dayjs().subtract(7, "d"), dayjs()] },
    {
      label: "最近一個月",
      value: [dayjs().subtract(1, "month"), dayjs()],
    },
    { label: "最近三個月", value: [dayjs().subtract(3, "month"), dayjs()] },
  ];

  return {
    columns,
    data,
    searchValue,
    isTableLoading,
    pageDto,
    setSearchValue,
    setPageDto,
    setIsTableLoading,
    rangePresets,
    onRangeChange,
    startDate,
    endDate,
  };
};
