import {
  CalendarOutlined,
  ClockCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Pagination, Table } from "antd";
import { Dayjs } from "dayjs";

import { useAction } from "./hook";

const { RangePicker } = DatePicker;

export const OperationLog = () => {
  const {
    columns,
    data,
    searchValue,
    isTableLoading,
    pageDto,
    setSearchValue,
    setPageDto,
    rangePresets,
    onRangeChange,
    startDate,
    endDate,
  } = useAction();

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
        操作日誌
      </span>
      <div className="mt-[1.5rem] mb-[1.125rem] h-[2.5rem] flex items-center">
        <Input
          className="w-[17.5rem] h-[2.2rem]"
          placeholder="搜索車牌號碼"
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
          className="ml-5 w-[18.75rem] h-[2.2rem]"
          presets={rangePresets}
          onChange={onRangeChange}
          renderExtraFooter={() => (
            <div className="flex justify-between">
              {renderDateAndTime(startDate)}
              {renderDateAndTime(endDate)}
            </div>
          )}
        />
      </div>
      <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
        <div className="h-full overflow-auto no-scrollbar pb-[1.125rem]">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
            loading={isTableLoading}
            sticky={true}
          />
        </div>
        <div className="flex justify-between items-center pt-[1rem]">
          <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
            共
            <span className="text-[#2853E3] font-light mx-1">
              {data.length}
            </span>
            條
          </div>
          <Pagination
            current={pageDto.pageIndex}
            pageSize={pageDto.pageSize}
            pageSizeOptions={[5, 10, 20]}
            total={data.length}
            showQuickJumper
            showSizeChanger
            onChange={(page, pageSize) =>
              setPageDto({ pageIndex: page, pageSize })
            }
          />
        </div>
      </div>
    </div>
  );
};
