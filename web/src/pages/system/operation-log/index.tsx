import {
  CalendarOutlined,
  ClockCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Pagination, Table, TableColumnsType } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Trans } from "react-i18next";

import KEYS from "@/i18n/language/keys/operation-log-keys";
import { ILogsDto } from "@/services/dtos/operate-log";

import { useAction } from "./hook";

const { RangePicker } = DatePicker;

export const OperationLog = () => {
  const {
    searchValue,
    isTableLoading,
    pageDto,
    setSearchValue,
    onChangePage,
    rangePresets,
    onRangeChange,
    t,
    dateRange,
    operateLogsDto,
  } = useAction();

  const columns: TableColumnsType<ILogsDto> = [
    {
      title: t(KEYS.SERIAL_NUMBER, { ns: "operationLog" }),
      dataIndex: "id",
      width: "13%",
    },
    {
      title: t(KEYS.USER_NAME, { ns: "operationLog" }),
      dataIndex: "actionUser",
      width: "11%",
    },
    {
      title: t(KEYS.OPERATING_CONTENT, { ns: "operationLog" }),
      dataIndex: "actionContent",
      width: "51%",
    },
    {
      title: t(KEYS.OPERATING_TIME, { ns: "operationLog" }),
      dataIndex: "createdTime",
      width: "25%",
      render: (text) => {
        return <div>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</div>;
      },
    },
  ];

  const renderDateAndTime = (date: Dayjs | null) => (
    <>
      <span>
        <CalendarOutlined className="mr-2" />
        {date?.format("YYYY-MM-DD")}
      </span>
      <span className="text-[#666774]">
        <ClockCircleFilled className="mr-2" />
        {date?.format("HH:mm:ss")}
      </span>
    </>
  );

  return (
    <div className="bg-white h-full w-full flex-col p-[1.5rem]">
      <span className="text-[1.125rem] font-semibold tracking-tight">
        {t(KEYS.OPERATION_LOG, { ns: "operationLog" })}
      </span>
      <div className="mt-[1.5rem] mb-[1rem] h-[2.5rem] flex items-center">
        <Input
          className="w-[17.5rem] h-[2.5rem]"
          placeholder={t(KEYS.SEARCH_LICENSE_PLATE_NUMBER, {
            ns: "operationLog",
          })}
          suffix={
            <SearchOutlined
              style={{
                color: "#5F6279",
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            />
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <RangePicker
          className="ml-5 w-[18.75rem] h-[2.5rem]"
          presets={rangePresets}
          onChange={onRangeChange}
          renderExtraFooter={() => (
            <div className="flex justify-between">
              {renderDateAndTime(dateRange[0])}
              {renderDateAndTime(dateRange[1])}
            </div>
          )}
          allowClear
          placeholder={[
            t(KEYS.START_DATE, { ns: "operationLog" }),
            t(KEYS.END_DATE, { ns: "operationLog" }),
          ]}
        />
      </div>
      <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
        <div className="h-full overflow-auto no-scrollbar pb-[1.125rem]">
          <Table
            columns={columns}
            dataSource={operateLogsDto.logs}
            pagination={false}
            rowKey="id"
            loading={isTableLoading}
            sticky={true}
          />
        </div>
        <div className="flex justify-between items-center pt-[1rem]">
          <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
            <Trans
              i18nKey={KEYS.PAGINATION}
              ns="operationLog"
              values={{ count: operateLogsDto.count }}
              components={{
                span: <span className="text-[#2853E3] font-light mx-1" />,
              }}
            />
          </div>
          <Pagination
            current={pageDto.pageIndex}
            pageSize={pageDto.pageSize}
            pageSizeOptions={[5, 10, 20]}
            total={operateLogsDto.count}
            showQuickJumper
            showSizeChanger
            onChange={(page, pageSize) => onChangePage(page, pageSize)}
          />
        </div>
      </div>
    </div>
  );
};
