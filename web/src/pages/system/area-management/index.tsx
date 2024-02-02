import { SearchOutlined, WarningFilled } from "@ant-design/icons";
import { Button, Input, Pagination, Table, TableColumnsType } from "antd";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/area-management-keys";
import { IRegionsDto } from "@/services/dtos/area-management";

import { AddAreaModal } from "./conponents/add-area-model";
import { useAction } from "./hook";

export const AreaManagement = () => {
  const {
    searchValue,
    pageDto,
    setSearchValue,
    setPageDto,
    t,
    isRegionListLoading,
    regionListCount,
    regionDataList,
    setSearchIconValue,
    setIsDeleteOpen,
    isDeleteOpen,
    initGetRegionList,
    handleDeleteById,
    setOperateModalParams,
    operateModalParams,
  } = useAction();

  const columns: TableColumnsType<IRegionsDto> = [
    {
      title: t(KEYS.AREA_ID, { ns: "areaManagement" }),
      dataIndex: "areaId",
      width: "10%",
    },
    {
      title: t(KEYS.AREA_NAME, { ns: "areaManagement" }),
      dataIndex: "areaName",
      width: "10%",
    },
    {
      title: t(KEYS.AREA_ADDRESS, { ns: "areaManagement" }),
      dataIndex: "regionAddress",
      width: "50%",
    },
    {
      title: t(KEYS.PRINCIPAL, { ns: "areaManagement" }),
      dataIndex: "principal",
      width: "10%",
    },
    {
      title: t(KEYS.OPERATE, { ns: "areaManagement" }),
      dataIndex: "operate",
      width: "20%",
      render: (_, record) => (
        <div className="h-[1.375rem]">
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setOperateModalParams({
                isOpen: true,
                isEdit: true,
                recordItem: record,
              });
            }}
          >
            {t(KEYS.EDIT, { ns: "areaManagement" })}
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteOpen(true);
              setOperateModalParams((preValue) => ({
                ...preValue,
                recordItem: record,
              }));
            }}
          >
            {t(KEYS.DELETE, { ns: "areaManagement" })}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white h-full w-full flex-col p-[1.5rem]">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          {t(KEYS.AREA_MANAGEMENT, { ns: "areaManagement" })}
        </span>
        <div className="mt-[1.5rem] mb-[1.125rem] h-[2.5rem] flex justify-between">
          <Input
            className="w-[17.5rem] h-[2.2rem]"
            placeholder={t(KEYS.SEARCH_AREA_ID_AREA_ADDRESS, {
              ns: "areaManagement",
            })}
            suffix={
              <SearchOutlined
                style={{
                  color: "#5F6279",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                }}
                onClick={() => setSearchIconValue(searchValue)}
              />
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            type="primary"
            className="w-[5.5rem] h-[2.2rem] text-center"
            onClick={() => {
              setOperateModalParams({
                isOpen: true,
                isEdit: false,
              });
            }}
          >
            + {t(KEYS.ADD, { ns: "areaManagement" })}
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
          <div className="h-full overflow-auto no-scrollbar pb-[1.125rem]">
            <Table
              columns={columns}
              dataSource={regionDataList}
              pagination={false}
              rowKey="areaId"
              loading={isRegionListLoading}
              sticky={true}
            />
          </div>
          <div className="flex justify-between items-center pt-[1rem]">
            <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
              共
              <span className="text-[#2853E3] font-light mx-1">
                {regionListCount}
              </span>
              條
            </div>
            <Pagination
              current={pageDto.pageIndex}
              pageSize={pageDto.pageSize}
              pageSizeOptions={[5, 10, 20]}
              total={regionListCount}
              showQuickJumper
              showSizeChanger
              onChange={(page, pageSize) =>
                setPageDto({ pageIndex: page, pageSize })
              }
            />
          </div>
        </div>
      </div>

      <AddAreaModal
        setOperateModalParams={setOperateModalParams}
        operateModalParams={operateModalParams}
        initGetRegionList={initGetRegionList}
      />
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            操作确认
          </div>
        }
        onCancle={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          handleDeleteById(operateModalParams?.recordItem?.areaId ?? 0);
          setIsDeleteOpen(false);
        }}
        open={isDeleteOpen}
        className={"customModal"}
      >
        <span className="pl-[2rem]">请确认是否删除该区域</span>
      </CustomModal>
    </>
  );
};
