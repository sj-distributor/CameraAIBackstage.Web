import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Pagination, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { ColumnsType } from "antd/es/table";

import { CustomModal } from "@/components/custom-modal";

import { useAction } from "./hook";
import { IDeviceTypeDataType } from "./props";

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
  } = useAction();

  const columns: ColumnsType<IDeviceTypeDataType> = [
    {
      title: "設備類型ID",
      dataIndex: "deviceTypeId",
      width: "14.875rem",
    },
    {
      title: "設備類型",
      dataIndex: "deviceType",
      width: "15.125rem",
    },
    {
      title: "備註信息",
      dataIndex: "deviceInformation",
      width: "49.4375rem",
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: "21.5625rem",
      render: (_, record, index) => (
        <div>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => setIsModifyOpen(true)}
          >
            編輯
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteIndex(index);
              setIsDeleteDeviceOpen(true);
            }}
          >
            刪除
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
        <div className="bg-white h-[calc(100vh-5rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            設備列表
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-end">
            <Button
              type="primary"
              className="h-[2.75rem] w-[7.25rem]"
              onClick={() => setIsAddTypeOpen(true)}
            >
              <PlusOutlined className="pr-[.5rem]" />
              添加類型
            </Button>
          </div>
          <Table
            rowKey={(record) => record.deviceTypeId}
            columns={columns}
            dataSource={data}
            className="pt-[1.125rem] tableHiddenScrollBar"
            scroll={{ y: 580 }}
            pagination={false}
          />
          <div className="flex justify-between items-center pt-[16px]">
            <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
              共{" "}
              <span className="text-[#2853E3] font-light">{data.length}</span>{" "}
              條
            </div>
            <div>
              <Pagination
                current={1}
                pageSize={5}
                pageSizeOptions={[5, 10, 20]}
                total={data.length}
                showQuickJumper
                showSizeChanger
                onChange={() => {}}
                className="flex flex-wrap justify-center"
              />
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        title={<div>添加類型</div>}
        onCancle={() => setIsAddTypeOpen(false)}
        onConfirm={() => setIsAddTypeOpen(false)}
        open={isAddTypeOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
      >
        <Form colon={false}>
          <FormItem
            name="deviceId"
            label="設備類型"
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <Input placeholder="請輸入設備類型名稱" />
          </FormItem>
          <FormItem
            name="deviceType"
            label="備註說明"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            style={{ marginBottom: 0 }}
          >
            <TextArea placeholder="請輸入設備類型備註說明" />
          </FormItem>
        </Form>
      </CustomModal>
      <CustomModal
        title={<div>修改類型</div>}
        onCancle={() => setIsModifyOpen(false)}
        onConfirm={() => setIsModifyOpen(false)}
        open={isModifyOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
      >
        <Form colon={false}>
          <FormItem
            name="deviceId"
            label="設備類型"
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <Input placeholder="請輸入設備類型名稱" />
          </FormItem>
          <FormItem
            name="deviceType"
            label="備註說明"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            style={{ marginBottom: 0 }}
          >
            <TextArea placeholder="請輸入設備類型備註說明" />
          </FormItem>
        </Form>
      </CustomModal>
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            操作確認
          </div>
        }
        onCancle={() => setIsDeleteDeviceOpen(false)}
        onConfirm={() => {
          setIsDeleteDeviceOpen(false);
        }}
        open={isDeleteDeviceOpen}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否刪除類型？</span>
      </CustomModal>
    </ConfigProvider>
  );
};
