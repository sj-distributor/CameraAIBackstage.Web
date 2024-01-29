import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Pagination, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { ColumnsType } from "antd/es/table";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/equipment-type-keys";

import { useAction } from "./hook";
import { IEquipmentTypeList } from "@/services/dtos/equipment/type";

export const EquipmentType = () => {
  const {
    isAddTypeOpen,
    setIsAddTypeOpen,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isModifyOpen,
    setIsModifyOpen,
    setIsDeleteIndex,
    data,
    t,
    setPageDto,
    loading,
    typeName,
    setTypeName,
    description,
    setDescription,
    totalListCount,
    onIsAddSubmit,
    form,
  } = useAction();

  const columns: ColumnsType<IEquipmentTypeList> = [
    {
      title: t(KEYS.DEVICE_TYPE_ID, { ns: "equipmentType" }),
      dataIndex: "id",
      width: "14.875rem",
    },
    {
      title: t(KEYS.DEVICE_TYPE, { ns: "equipmentType" }),
      dataIndex: "name",
      width: "15.125rem",
    },
    {
      title: t(KEYS.REMARKS, { ns: "equipmentType" }),
      dataIndex: "description",
      width: "49.4375rem",
    },
    {
      title: t(KEYS.OPERATE, { ns: "equipmentType" }),
      dataIndex: "operate",
      width: "21.5625rem",
      render: (_, _record, index) => (
        <div>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => setIsModifyOpen(true)}
          >
            {t(KEYS.EDIT, { ns: "equipmentType" })}
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteIndex(index);
              setIsDeleteDeviceOpen(true);
            }}
          >
            {t(KEYS.DELETE, { ns: "equipmentType" })}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#2853E3",
            colorPrimaryHover: "#2853E3",
          },
          Button: {
            colorLink: "#2853E3",
            colorLinkActive: "#5168e3",
            colorLinkHover: "#5168e3",
            colorPrimary: "#2853E3",
            colorPrimaryHover: "#5168e3",
            defaultBorderColor: "#2853E3",
            defaultColor: "#2853E3",
            linkHoverBg: "#F0F4FF",
          },
        },
      }}
    >
      <div>
        <div className="bg-white h-[calc(100vh-7rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            {t(KEYS.DEVICE_TYPE, { ns: "equipmentType" })}
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-end">
            <Button
              type="primary"
              className="h-[2.75rem]"
              onClick={() => setIsAddTypeOpen(true)}
            >
              <PlusOutlined className="pr-[.5rem]" />
              {t(KEYS.ADD_TYPE, { ns: "equipmentType" })}
            </Button>
          </div>
          <div className="flex flex-col h-[calc(100%-6rem)] justify-between pt-[1.125rem]">
            <Table
              loading={loading}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={data}
              className="tableHiddenScrollBar flex-1"
              scroll={{ y: 510 }}
              pagination={false}
            />
            <div className="flex justify-between items-center py-[1rem]">
              <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
                共{" "}
                <span className="text-[#2853E3] font-light">
                  {totalListCount}
                </span>{" "}
                條
              </div>
              <div>
                <Pagination
                  current={1}
                  pageSize={5}
                  pageSizeOptions={[5, 10, 20]}
                  total={totalListCount}
                  showQuickJumper
                  showSizeChanger
                  onChange={(pageSize, pageIndex) => {
                    setPageDto({ PageIndex: pageIndex, PageSize: pageSize });
                  }}
                  className="flex flex-wrap justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        title={<div> {t(KEYS.ADD_TYPE, { ns: "equipmentType" })}</div>}
        onCancle={() => setIsAddTypeOpen(false)}
        onConfirm={() => onIsAddSubmit(true)}
        open={isAddTypeOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
      >
        <Form colon={false} onFinish={() => onIsAddSubmit(true)} form={form}>
          <FormItem
            name="typeName"
            label={t(KEYS.DEVICE_TYPE, { ns: "equipmentType" })}
            rules={[{ required: true }]}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input
              placeholder={t(KEYS.PLEASE_ENTER_DEVICE_TYPE, {
                ns: "equipmentType",
              })}
              value={typeName}
              onChange={(e) => {
                setTypeName(e.target.value);
              }}
            />
          </FormItem>
          <FormItem
            name="description"
            label={t(KEYS.INSTRUCTION_MANUAL, { ns: "equipmentType" })}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ marginBottom: 0 }}
          >
            <TextArea
              placeholder={t(KEYS.PLEASE_ENTER_INSTRUCTION_MANUAL, {
                ns: "equipmentType",
              })}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </FormItem>
        </Form>
      </CustomModal>

      {/* 添加類型 */}
      <CustomModal
        title={<div> {t(KEYS.MODIFICATION_TYPE, { ns: "equipmentType" })}</div>}
        onCancle={() => setIsModifyOpen(false)}
        onConfirm={() => onIsAddSubmit(false)}
        open={isModifyOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
      >
        <Form colon={false} onFinish={() => onIsAddSubmit(false)} form={form}>
          <FormItem
            name="typeName"
            label={t(KEYS.DEVICE_TYPE, { ns: "equipmentType" })}
            rules={[{ required: true }]}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input
              placeholder={t(KEYS.PLEASE_ENTER_DEVICE_TYPE, {
                ns: "equipmentType",
              })}
            />
          </FormItem>
          <FormItem
            name="description"
            label={t(KEYS.INSTRUCTION_MANUAL, { ns: "equipmentType" })}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ marginBottom: 0 }}
          >
            <TextArea
              placeholder={t(KEYS.PLEASE_ENTER_INSTRUCTION_MANUAL, {
                ns: "equipmentType",
              })}
            />
          </FormItem>
        </Form>
      </CustomModal>

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRMATION, {
              ns: "equipmentType",
            })}
          </div>
        }
        onCancle={() => setIsDeleteDeviceOpen(false)}
        onConfirm={() => {
          setIsDeleteDeviceOpen(false);
        }}
        open={isDeleteDeviceOpen}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {t(KEYS.PLEASE_CONFIRM_WHETHER_TO_DELETE, {
            ns: "equipmentType",
          })}
        </span>
      </CustomModal>
    </ConfigProvider>
  );
};
