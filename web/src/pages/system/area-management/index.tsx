import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Table, TableColumnsType } from "antd";

import { CustomModal } from "@/components/custom-modal";

import { AddAreaModal } from "./conponents/add-area-model";
import { useAction } from "./hook";
import { IAreaManagementData } from "./props";

export const AreaManagement = () => {
  const {
    data,
    setIsModalOpen,
    setIsDeleteIndex,
    searchValue,
    isTableLoading,
    pageDto,
    setSearchValue,
    setPageDto,
    isModalOpen,
    handleAddInput,
    handleRemoveInput,
    inputFields,
  } = useAction();

  const columns: TableColumnsType<IAreaManagementData> = [
    {
      title: "區域ID",
      dataIndex: "areaId",
      width: "10%",
    },
    {
      title: "區域｜名稱",
      dataIndex: "areaName",
      width: "10%",
    },
    {
      title: "區域地址",
      dataIndex: "areaAddress",
      width: "50%",
    },
    {
      title: "負責人",
      dataIndex: "person",
      width: "10%",
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: "20%",
      render: (_, __, index) => (
        <div className="h-[1.375rem]">
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => setIsModalOpen(true)}
          >
            編輯
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteIndex(index);
            }}
          >
            刪除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white h-full w-full flex-col p-[1.5rem]">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          區域管理
        </span>
        <div className="mt-[1.5rem] mb-[1.125rem] h-[2.5rem] flex justify-between">
          <Input
            className="w-[17.5rem] h-[2.2rem]"
            placeholder="搜索區域ID、區域地址"
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
          <Button
            type="primary"
            className="w-[5.5rem] h-[2.2rem] text-center"
            onClick={() => setIsModalOpen(true)}
          >
            + 新增
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
          <div className="h-full overflow-auto no-scrollbar pb-[1.125rem]">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              rowKey="areaId"
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
      <CustomModal
        title={
          <div className="text-[1.25rem] font-semibold tracking-tight leading-[1.875rem]">
            新增區域
          </div>
        }
        onCancle={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
        className={"customDeviceModal"}
        modalWidth="42.5rem"
      >
        <AddAreaModal
          handleAddInput={handleAddInput}
          handleRemoveInput={handleRemoveInput}
          inputFields={inputFields}
        />
      </CustomModal>
    </>
  );
};
