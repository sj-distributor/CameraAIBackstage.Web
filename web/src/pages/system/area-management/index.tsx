import { SearchOutlined, WarningFilled } from "@ant-design/icons";
import { Button, Input, Pagination, Table, TableColumnsType } from "antd";
import { Trans } from "react-i18next";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/area-management-keys";
import { BackGroundRolePermissionEnum } from "@/pages/user/user-permissions/user-newpermissions/props";
import { IRegionsDto } from "@/services/dtos/area-management";

import { AddAreaModal } from "./conponents/add-area-model";
import { useAction } from "./hook";

export const AreaManagement = () => {
  const {
    pageDto,
    setPageDto,
    t,
    isRegionListLoading,
    setIsDeleteOpen,
    isDeleteOpen,
    initGetRegionList,
    handleDeleteById,
    setOperateModalParams,
    operateModalParams,
    isLoading,
    source,
    initialRegionDataItem,
    regionListDto,
    myPermissions,
  } = useAction();

  const columns: TableColumnsType<IRegionsDto> = [
    {
      title: t(KEYS.AREA_ID, source),
      dataIndex: "areaId",
      width: "10%",
    },
    {
      title: t(KEYS.WAREHOUSE_ID, source),
      dataIndex: "locationId",
      width: "10%",
    },
    {
      title: t(KEYS.AREA_NAME, source),
      dataIndex: "areaName",
      width: "10%",
    },
    {
      title: t(KEYS.AREA_ADDRESS, source),
      dataIndex: "regionAddress",
      width: "50%",
    },
    {
      title: t(KEYS.PRINCIPAL, source),
      dataIndex: "principal",
      width: "10%",
    },
    {
      title: t(KEYS.OPERATE, source),
      dataIndex: "operate",
      width: "20%",
      render: (_, record) => (
        <div className="h-[1.375rem]">
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanUpdateCameraAiArea
          ) && (
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
              {t(KEYS.EDIT, source)}
            </Button>
          )}
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanDeleteCameraAiArea
          ) && (
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
              {t(KEYS.DELETE, source)}
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white h-full w-full flex-col p-[1.5rem]">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          {t(KEYS.AREA_MANAGEMENT, source)}
        </span>
        <div className="mt-[1.5rem] mb-[1rem] h-[2.5rem] flex justify-between">
          <Input
            className="w-[17.5rem] h-[2.5rem]"
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
              />
            }
            value={pageDto.keyword}
            onChange={(e) => {
              setPageDto((pre) => ({
                ...pre,
                pageIndex: 1,
                keyword: e.target.value,
              }));
            }}
          />
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanAddCameraAiArea
          ) && (
            <Button
              type="primary"
              className="w-[5.5rem] h-[2.75rem] text-center"
              onClick={() => {
                setOperateModalParams({
                  isOpen: true,
                  isEdit: false,
                  recordItem: initialRegionDataItem,
                });
              }}
            >
              + {t(KEYS.ADD, source)}
            </Button>
          )}
        </div>
        <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
          <div className="h-full overflow-auto no-scrollbar pb-[1.125rem]">
            <Table
              columns={columns}
              dataSource={regionListDto.regions}
              pagination={false}
              rowKey="areaId"
              loading={isRegionListLoading}
              sticky={true}
            />
          </div>
          <div className="flex justify-between items-center pt-[1rem]">
            <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
              <Trans
                i18nKey={KEYS.PAGINATION}
                ns="portraitList"
                values={{ count: regionListDto.count }}
                components={{
                  span: <span className="text-[#2853E3] font-light mx-1" />,
                }}
              />
            </div>
            <Pagination
              current={pageDto.pageIndex}
              pageSize={pageDto.pageSize}
              pageSizeOptions={[5, 10, 20]}
              total={regionListDto.count}
              showQuickJumper
              showSizeChanger
              onChange={(page, pageSize) =>
                setPageDto((pre) => ({ ...pre, pageIndex: page, pageSize }))
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
          <div className="text-[1.25rem] font-semibold leading-[1.875rem]">
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRM, source)}
          </div>
        }
        onCancle={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          handleDeleteById(operateModalParams?.recordItem?.areaId ?? 0);
          setIsDeleteOpen(false);
        }}
        open={isDeleteOpen}
        className={"customModal"}
        confirmLoading={isLoading}
      >
        <span className="pl-[2rem] text-[1rem]">
          {t(KEYS.DELETE_TIPS, source)}
        </span>
      </CustomModal>
    </>
  );
};
