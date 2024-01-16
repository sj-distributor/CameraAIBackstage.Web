import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Radio,
  Select,
  Switch,
  Table,
  Tooltip,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import type { ColumnsType } from "antd/es/table";
import { clone } from "ramda";

import { CustomModal } from "@/components/custom-modal";

import downArrow from "../../../assets/public/down-arrow.png";
import search from "../../../assets/public/search.png";
import { useAction } from "./hook";
import { IDataType, IDeviceDataType } from "./props";

export const EquipmentList = () => {
  const {
    isUnbindOpen,
    setIsUnbindOpen,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isBindingOpen,
    setIsBindingOpen,
    isAddDeviceOpen,
    setIsAddDeviceOpen,
    isUnbindIndex,
    setIsUnbindIndex,
    setIsDeleteIndex,
    data,
    setData,
    deviceData,
  } = useAction();

  const columns: ColumnsType<IDataType> = [
    {
      title: "設備ID",
      dataIndex: "deviceId",
      width: "16.6%",
    },
    {
      title: "是否在線",
      dataIndex: "isOnline",
      width: "16.6%",
      render: (record: boolean) => (
        <div>
          {record ? (
            <div className="flex flex-row items-center">
              <div className="bg-[#34A46E] w-[.375rem] h-[.375rem] rounded-full mr-[.5rem]" />
              <span>在線</span>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <div className="bg-[#F04E4E] min-w-[.375rem] max-w-[.375rem] h-[.375rem] rounded-full mr-[.5rem]" />
              <span className="whitespace-nowrap">離線</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "設備類型",
      dataIndex: "deviceType",
      width: "16.6%",
    },
    {
      title: "設備名稱",
      dataIndex: "equipmentName",
      width: "16.6%",
    },
    {
      title: "是否綁定",
      dataIndex: "whetherToBind",
      width: "16.6%",
      render: (_, record, index) => {
        return (
          <Tooltip
            placement="topLeft"
            title={record ? "點擊解除綁定" : "點擊綁定"}
          >
            <Switch
              checkedChildren="綁定"
              unCheckedChildren=""
              value={record.whetherToBind}
              onChange={(value) => {
                const newList = clone(data);

                if (newList[index].whetherToBind && !value) {
                  setIsUnbindOpen(true);
                  setIsUnbindIndex(index);

                  return;
                }
                newList[index].whetherToBind = value;
                setData(newList);
              }}
              className="w-[3.125rem] text-[.625rem] customSwitch"
            />
          </Tooltip>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: "16.6%",
      render: (_, record, index) => (
        <div>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => setIsBindingOpen(true)}
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

  const deviceColumns: ColumnsType<IDeviceDataType> = [
    {
      title: "",
      dataIndex: "radio",
      width: "3.625rem",
      render: () => <Radio />,
    },
    {
      title: "區域ID",
      dataIndex: "areaId",
      width: "9.5rem",
    },
    {
      title: "區域名稱",
      dataIndex: "areaName",
      width: "9.5rem",
    },
    {
      title: "區域地址",
      dataIndex: "areaAddress",
      width: "24.875rem",
    },
    {
      title: "負責人",
      dataIndex: "person",
      width: "9.5rem",
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
            設備列表
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-between">
            <div>
              <Input
                className="w-[17.5rem]"
                suffix={<img src={search} />}
                placeholder="搜索設備ID、設備類型、設備名稱"
              />
              <Select
                className="mx-[1rem] w-[13.5rem]"
                placeholder="是否在線"
                defaultActiveFirstOption
                options={[
                  { value: "是否在線", label: "是否在線" },
                  { value: "在線", label: "在線" },
                  { value: "離線", label: "離線" },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
              <Select
                className="w-[13.5rem]"
                placeholder="是否確定"
                defaultActiveFirstOption
                options={[
                  { value: "是否確定", label: "是否確定" },
                  { value: "已綁定", label: "已綁定" },
                  { value: "未綁定", label: "未綁定" },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
            </div>
            <Button
              type="primary"
              className="h-[2.75rem] w-[7.25rem]"
              onClick={() => setIsAddDeviceOpen(true)}
            >
              <PlusOutlined className="pr-[.5rem]" />
              添加設備
            </Button>
          </div>
          <div className="flex flex-col h-[calc(100%-6rem)] justify-between pt-[1.125rem]">
            <Table
              rowKey={(record) => record.deviceId}
              columns={columns}
              dataSource={data}
              className="tableHiddenScrollBar flex-1"
              scroll={{ y: 510 }}
              pagination={false}
            />
            <div className="flex justify-between items-center py-[1rem]">
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
      </div>

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            操作確認
          </div>
        }
        onCancle={() => setIsUnbindOpen(false)}
        onConfirm={() => {
          const newList = clone(data);

          newList[isUnbindIndex].whetherToBind = false;
          setData(newList);
          setIsUnbindOpen(false);
        }}
        open={isUnbindOpen}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否解除綁定？</span>
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
        <span className="pl-[2rem]">請確認是否刪除設備？</span>
      </CustomModal>

      <CustomModal
        title={<div>設備綁定</div>}
        onCancle={() => setIsBindingOpen(false)}
        onConfirm={() => setIsBindingOpen(false)}
        open={isBindingOpen}
        className={"customDeviceModal"}
        modalWidth={"60rem"}
      >
        <Table
          rowKey={(record) => record.areaId}
          columns={deviceColumns}
          dataSource={deviceData}
          className="tableHiddenScrollBar"
          scroll={{ y: 450 }}
          pagination={false}
        />
      </CustomModal>

      <CustomModal
        title={<div>添加設備</div>}
        onCancle={() => setIsAddDeviceOpen(false)}
        onConfirm={() => setIsAddDeviceOpen(false)}
        open={isAddDeviceOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
      >
        <Form colon={false}>
          <FormItem
            name="deviceId"
            label="設備ID"
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
          >
            <Input placeholder="請輸入" />
          </FormItem>
          <FormItem
            name="deviceType"
            label="設備類型"
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
          >
            <Select
              suffixIcon={<img src={downArrow} />}
              placeholder="請選擇"
              defaultActiveFirstOption
              options={[
                { value: "請選擇", label: "請選擇" },
                { value: "攝像頭", label: "攝像頭" },
                { value: "大聲公", label: "大聲公" },
              ]}
            />
          </FormItem>
          <FormItem
            name="deviceName"
            label="設備名稱"
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="請輸入" />
          </FormItem>
        </Form>
      </CustomModal>
    </ConfigProvider>
  );
};
