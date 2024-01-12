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
      width: "238px",
    },
    {
      title: "設備類型",
      dataIndex: "deviceType",
      width: "242px",
    },
    {
      title: "備註信息",
      dataIndex: "deviceInformation",
      width: "791px",
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: "345px",
      render: (_, record, index) => (
        <div>
          <Button
            type="link"
            className="w-[96px]"
            onClick={() => setIsModifyOpen(true)}
          >
            編輯
          </Button>
          <Button
            type="link"
            className="w-[96px]"
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
          },
        },
      }}
    >
      <div className="h-full w-full p-[24px]">
        <div className="bg-white h-[calc(100vh-80px)] w-full flex-col justify-start p-[24px] overflow-scroll no-scrollbar">
          <span className="text-[18px] font-semibold tracking-tight">
            設備列表
          </span>
          <div className="flex flex-row pt-[26px] justify-end">
            <Button
              type="primary"
              className="h-[44px] w-[116px]"
              onClick={() => setIsAddTypeOpen(true)}
            >
              <PlusOutlined className="pr-[8px]" />
              添加設備
            </Button>
          </div>
          <Table
            rowKey={(record) => record.deviceTypeId}
            columns={columns}
            dataSource={data}
            className="pt-[18px] tableHiddenScrollBar"
            scroll={{ y: 580 }}
            pagination={false}
          />
          <div className="flex justify-between items-center pt-[1rem]">
            <div className="text-[#929292] text-[14px]">
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
        className={"custom-device-modal"}
        modalWidth={"680px"}
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
        className={"custom-device-modal"}
        modalWidth={"680px"}
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
            <WarningFilled className="text-[#ED940F] pr-[10px]" />
            操作確認
          </div>
        }
        onCancle={() => setIsDeleteDeviceOpen(false)}
        onConfirm={() => {
          setIsDeleteDeviceOpen(false);
        }}
        open={isDeleteDeviceOpen}
        className={"custom-modal"}
      >
        <span className="pl-[32px]">請確認是否刪除類型？</span>
      </CustomModal>
    </ConfigProvider>
  );
};
