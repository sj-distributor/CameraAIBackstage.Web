import {
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Empty,
  Form,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Spin,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { isEmpty, isNil } from "ramda";
import { useState } from "react";
import { Trans } from "react-i18next";

import { CustomModal } from "@/components/custom-modal";
import { PlotArea } from "@/pages/monitor/component/plot-area";
import { BackGroundRolePermissionEnum } from "@/pages/user/user-permissions/user-newpermissions/props";
import { IDoorsItem } from "@/services/dtos/access-management";

import { useAction } from "./hook";
import { AccessTypeLabel, DoorType } from "./props";

export const Door = () => {
  const {
    paginationDto,
    addOrUpdateModal,
    cameras,
    getImgLoading,
    previewImg,
    addOrUpdateParams,
    isPlot,
    coordinatesRef,
    isEdit,
    getDoorsLoading,
    doorsList,
    deleteLoading,
    doorsLoading,
    initAddOrUpdateParams,
    myPermissions,
    equipmentName,
    updatePaginationDto,
    getRegionCamera,
    getImgByEquipmentId,
    handleChangeParams,
    setIsPlot,
    setIsEdit,
    deleteDoors,
    updateDoorsModal,
    handleAddOrUpdate,
    setPreviewImg,
    setEquipmentName,
  } = useAction();

  const [viewPlot, setViewPlot] = useState<boolean>(false);

  const column: TableColumnsType<IDoorsItem> = [
    {
      title: "出入口类型",
      dataIndex: "doorType",
      render: (value: DoorType) => {
        return <div>{AccessTypeLabel[value]}</div>;
      },
    },
    {
      title: "出入口名称",
      dataIndex: "doorName",
    },
    {
      title: "图片",
      dataIndex: "previewUrl",
      render: (value) => {
        return (
          <Image src={value} style={{ width: "2.69rem", height: "2.63rem" }} />
        );
      },
    },
    {
      title: "备注",
      dataIndex: "remark",
      render: (remark) => {
        return (
          <Tooltip title={remark}>
            <div className="line-clamp-2">{remark}</div>
          </Tooltip>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdDate",
      render: (createdDate) => {
        return <div>{dayjs(createdDate).format("YYYY-MM-DD HH:mm:ss")}</div>;
      },
    },
    {
      title: "操作",
      render: (record: IDoorsItem) => {
        return (
          <div>
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanUpdateCameraAiDoor
            ) && (
              <Button
                type="link"
                className="text-[#2853E3]"
                onClick={() => {
                  getRegionCamera();

                  updateDoorsModal({
                    type: "update",
                    open: true,
                  });

                  handleChangeParams(record);

                  setPreviewImg(record.previewUrl);

                  const objectArray = record.orientation.map((item) => ({
                    xCoordinate: item[0],
                    yCoordinate: item[1],
                  }));

                  coordinatesRef.current = objectArray;
                }}
              >
                编辑
              </Button>
            )}
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanDeleteCameraAiDoor
            ) && (
              <Popconfirm
                title="删除提醒"
                description="是否确认删除？"
                rootClassName="portrait"
                onConfirm={() => deleteDoors(record.doorId)}
              >
                <Button type="link" className="text-[#2853E3]">
                  删除
                </Button>
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  const equipmentOptions = cameras.map((region, index) => ({
    label: (
      <span className="text-[0.875rem] text-[#323444]" key={index}>
        {region.regionAddress}
      </span>
    ),
    options: region.cameras.map((camera) => ({
      label: camera.equipmentName,
      value: `${region.locationId}::${camera.equipmentCode}`,
      key: camera.id,
    })),
  }));

  return (
    <div className="bg-white h-full w-full flex-col p-[1.5rem]">
      <span className="text-[1.125rem] font-semibold tracking-tight">
        出入口管理
      </span>
      <>
        {isPlot ? (
          <PlotArea
            isEdit={isEdit}
            previewImg={previewImg}
            coordinatesRef={coordinatesRef}
            equipmentName={equipmentName}
            backPage={() => {
              setIsPlot(false);
              setIsEdit(false);
              updateDoorsModal({
                open: true,
              });
            }}
          />
        ) : (
          <>
            <div className="mt-[1.5rem] mb-[1rem] h-[2.5rem] flex items-center">
              <Input
                className="w-[17.5rem] h-[2.5rem]"
                placeholder="請輸入出入口名稱"
                suffix={
                  <SearchOutlined
                    style={{
                      color: "#5F6279",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                    }}
                  />
                }
                onChange={(e) =>
                  updatePaginationDto({ Keyword: e.target.value })
                }
              />
              <Select
                className="mx-[1rem] w-[13.5rem] h-[2.5rem]"
                placeholder="出入口类型"
                allowClear
                options={[
                  {
                    value: DoorType.RollDoor,
                    label: AccessTypeLabel[DoorType.RollDoor],
                  },
                  {
                    value: DoorType.SafeDoor,
                    label: AccessTypeLabel[DoorType.SafeDoor],
                  },
                ]}
                onChange={(value) =>
                  updatePaginationDto({
                    DoorType: value as DoorType,
                  })
                }
              />
              {myPermissions.includes(
                BackGroundRolePermissionEnum.CanAddCameraAiDoor
              ) && (
                <Button
                  type="primary"
                  className="w-[6rem] h-[2.75rem] mr-[1rem] bg-[#2853E3] ml-auto flex items-center justify-around"
                  onClick={() => {
                    updateDoorsModal({
                      type: "add",
                      open: true,
                    });

                    getRegionCamera();
                  }}
                >
                  <PlusOutlined />
                  <div>新增</div>
                </Button>
              )}
            </div>

            <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
              <div className="h-full overflow-auto no-scrollbar pb-[1.125rem]">
                <Table
                  columns={column}
                  dataSource={doorsList.doors}
                  pagination={false}
                  rowKey={(record) => record.doorId}
                  sticky={true}
                  scroll={{ x: 800 }}
                  loading={getDoorsLoading}
                />
              </div>
              <div className="flex justify-between items-center pt-[1rem]">
                <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
                  <Trans
                    i18nKey={`共 <span>{{count}}</span> 條`}
                    ns="operationLog"
                    values={{ count: doorsList.count }}
                    components={{
                      span: <span className="text-[#2853E3] font-light mx-1" />,
                    }}
                  />
                </div>
                <Pagination
                  total={doorsList.count}
                  current={paginationDto.PageIndex}
                  pageSize={paginationDto.PageSize}
                  pageSizeOptions={[5, 10, 20]}
                  showQuickJumper
                  showSizeChanger
                  onChange={(page, pageSize) => {
                    updatePaginationDto({
                      PageIndex: page,
                      PageSize: pageSize,
                    });
                  }}
                />
              </div>
            </div>
          </>
        )}
      </>

      <Spin fullscreen spinning={deleteLoading} />

      <CustomModal
        title={
          <div>{addOrUpdateModal.type === "add" ? "添加" : "编辑"}出入口</div>
        }
        open={addOrUpdateModal.open}
        className="customDeviceModal"
        modalWidth="42.5rem"
        confirmLoading={doorsLoading}
        destroyOnClose
        onConfirm={() => {
          const orientation = coordinatesRef.current.map((item) => [
            item.xCoordinate,
            item.yCoordinate,
          ]);

          if (
            isEmpty(addOrUpdateParams.doorName) ||
            isNil(addOrUpdateParams.doorType) ||
            isEmpty(addOrUpdateParams.equipmentCode) ||
            isEmpty(addOrUpdateParams.locationId)
          ) {
            message.warning("請填寫完整信息");

            return;
          }

          if (isEmpty(previewImg)) {
            message.warning("绘制区域为空");

            return;
          }

          if (isEmpty(orientation)) {
            message.warning("未监测到有绘制区域");

            return;
          }

          handleAddOrUpdate(orientation);
        }}
        onCancle={() => {
          updateDoorsModal({
            open: false,
          });

          handleChangeParams(initAddOrUpdateParams);

          setPreviewImg("");

          coordinatesRef.current = [];
        }}
      >
        <Form
          colon={false}
          className="max-h-[24.56rem] overflow-y-scroll no-scrollbar"
        >
          <Form.Item label="出入口类型" labelCol={{ span: 4 }}>
            <Select
              placeholder="请选择"
              style={{ width: "25rem" }}
              value={addOrUpdateParams.doorType}
              options={[
                {
                  value: DoorType.SafeDoor,
                  label: AccessTypeLabel[DoorType.SafeDoor],
                },
                {
                  value: DoorType.RollDoor,
                  label: AccessTypeLabel[DoorType.RollDoor],
                },
              ]}
              onChange={(value) => handleChangeParams({ doorType: value })}
            />
          </Form.Item>
          <Form.Item label="出入口名称" labelCol={{ span: 4 }}>
            <Input
              placeholder="请输入"
              style={{ width: "25rem" }}
              value={addOrUpdateParams.doorName}
              onChange={(e) => handleChangeParams({ doorName: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="选择设备" labelCol={{ span: 4 }}>
            <Select
              placeholder="请选择"
              popupClassName="accessSelect"
              style={{ width: "25rem" }}
              options={equipmentOptions}
              value={
                addOrUpdateParams.locationId && addOrUpdateParams.equipmentCode
                  ? `${addOrUpdateParams.locationId}::${addOrUpdateParams.equipmentCode}`
                  : undefined
              }
              onChange={(value, option) => {
                const selectedOption = option as unknown as {
                  label: string;
                  value: string;
                  key: string | number;
                };

                setEquipmentName(selectedOption.label);

                coordinatesRef.current = [];

                const [locationId, equipmentCode] = value.split("::");

                handleChangeParams({
                  locationId: locationId,
                  equipmentCode: equipmentCode,
                });

                getImgByEquipmentId(selectedOption.key);
              }}
            />
          </Form.Item>
          <Form.Item label="图片" labelCol={{ span: 4 }}>
            <div className="flex w-[25rem]">
              {getImgLoading ? (
                <Spin
                  style={{ width: "5rem", height: "5rem" }}
                  className="flex justify-center items-center"
                />
              ) : previewImg ? (
                <div
                  className="w-[5rem] h-[5rem] cursor-pointer"
                  onClick={() => setViewPlot(true)}
                >
                  <PlotArea
                    isEdit={isEdit}
                    previewImg={previewImg}
                    equipmentName={equipmentName}
                    coordinatesRef={coordinatesRef}
                    backPage={() => {}}
                  />
                </div>
              ) : (
                <Empty style={{ width: "5rem", height: "5rem" }} />
              )}

              <Button
                className="w-[6rem] h-[2rem] ml-1 mt-auto border-[#2853E3] text-[#2853E3]"
                disabled={!addOrUpdateParams.equipmentCode}
                onClick={() => {
                  if (!previewImg) {
                    message.info("繪製區域為空");

                    return;
                  }

                  setIsPlot(true);
                  setIsEdit(true);
                  updateDoorsModal({
                    open: false,
                  });
                }}
              >
                绘制区域
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="备注" labelCol={{ span: 4 }}>
            <Input.TextArea
              placeholder="请输入"
              className="w-[34.95rem]"
              value={addOrUpdateParams.remark}
              onChange={(e) => handleChangeParams({ remark: e.target.value })}
            />
          </Form.Item>
        </Form>
      </CustomModal>

      <Modal
        width={1000}
        open={viewPlot}
        closable={false}
        footer={null}
        destroyOnClose
        className="plotModal relative"
      >
        <div className="h-[30rem]">
          <PlotArea
            isEdit={isEdit}
            previewImg={previewImg}
            coordinatesRef={coordinatesRef}
            equipmentName={equipmentName}
            backPage={() => {}}
          />
        </div>

        <div
          className="absolute left-[50%] -bottom-[3rem] cursor-pointer"
          onClick={() => setViewPlot(false)}
        >
          <CloseCircleOutlined
            style={{
              color: "#D7D7E2",
              fontSize: "1.67rem",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
