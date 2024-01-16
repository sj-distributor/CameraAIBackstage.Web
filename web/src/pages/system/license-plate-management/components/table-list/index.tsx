import {
  CloseCircleOutlined,
  PlusOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Select,
  Table,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import type { ColumnsType } from "antd/es/table";
import { clone } from "ramda";

import down from "@/assets/down.png";
import search from "@/assets/search.png";
import { CustomModal } from "@/components/custom-modal";

import { IDataType } from "../../props";
import { useAction } from "./hook";

export const LicensePlateManagementTable = (props: {
  setShowWarningDetails: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) => {
  const { setShowWarningDetails } = props;

  const {
    isUnbindOpen,
    setIsUnbindOpen,
    isShowLicensePlateOpen,
    setIsShowLicensePlateOpen,
    isRegisterOpen,
    setIsRegisterOpen,
    isAddDeviceOpen,
    setIsAddDeviceOpen,
    isUnbindIndex,
    data,
    setData,
  } = useAction();

  const columns: ColumnsType<IDataType> = [
    {
      title: "序號",
      dataIndex: "deviceId",
      width: "16.6%",
    },
    {
      title: "車牌號碼",
      dataIndex: "isOnline",
      width: "16.6%",
      render: () => <div>粵C15468</div>,
    },
    {
      title: "開始時間",
      dataIndex: "operate",
      width: "16.6%",
    },
    {
      title: "車輛類型",
      dataIndex: "equipmentName",
      width: "16.6%",
      render: (record: boolean) => (
        <div>
          {record ? (
            <div className="flex flex-row items-center">
              <div className="bg-[#34A46E] w-[6px] h-[6px] rounded-full mr-[8px]" />
              <span>在線</span>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <div className="bg-[#F04E4E] w-[6px] h-[6px] rounded-full mr-[8px]" />
              <span>離線</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: "26.6%",
      render: (_, record, index) => (
        <div>
          <Button
            type="link"
            className="w-[96px]"
            onClick={() => setIsRegisterOpen(true)}
          >
            登記
          </Button>
          <Button
            type="link"
            className="w-[96px]"
            onClick={() => setShowWarningDetails(record.deviceId)}
          >
            查看詳情
          </Button>
          <Button
            type="link"
            className="w-[96px]"
            onClick={() => {
              setIsShowLicensePlateOpen(true);
            }}
          >
            車牌圖片
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
        <div className="flex flex-row pt-[26px] justify-between">
          <div>
            <Input
              className="w-[280px]"
              suffix={<img src={search} />}
              placeholder="搜索車輛號碼"
            />
            <Select
              className="mx-[16px] w-[216px]"
              placeholder="最近一周"
              defaultActiveFirstOption
              options={[
                { value: "最近一周", label: "最近一周" },
                { value: "最近一個月", label: "最近一個月" },
                { value: "最近三個月", label: "最近三個月" },
                { value: "自定義時間範圍", label: "自定義時間範圍" },
              ]}
              suffixIcon={<img src={down} />}
            />
            <Select
              className="w-[216px]"
              placeholder="未登記"
              defaultActiveFirstOption
              options={[
                { value: "正常車輛", label: "正常車輛" },
                { value: "異常車輛", label: "異常車輛" },
                { value: "未登記", label: "未登記" },
              ]}
              suffixIcon={<img src={down} />}
            />
          </div>
          <Button
            type="primary"
            className="h-[44px] w-[116px] bg-[#2853E3] flex items-center"
            onClick={() => setIsAddDeviceOpen(true)}
          >
            <PlusOutlined className="pr-[8px]" />
            添加設備
          </Button>
        </div>
        <Table
          rowKey={(record) => record.deviceId}
          columns={columns}
          dataSource={data}
          className="pt-[18px] tableHiddenScrollBar"
          scroll={{ y: 580 }}
          pagination={false}
        />
        <div className="flex justify-between items-center pt-[1rem]">
          <div className="text-[#929292] text-[14px]">
            共 <span className="text-[#2853E3] font-light">{data.length}</span>{" "}
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

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[10px]" />
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
        <span className="pl-[32px]">請確認是否解除綁定？</span>
      </CustomModal>

      <CustomModal
        title={<></>}
        onCancle={() => setIsShowLicensePlateOpen(false)}
        onConfirm={() => {
          setIsShowLicensePlateOpen(false);
        }}
        open={isShowLicensePlateOpen}
        className={"resettingModalPadding rounded-2xl max-h-max"}
        modalWidth={"60%"}
        footer={
          <div className="text-center absolute button-4 inset-x-0">
            <CloseCircleOutlined
              onClick={() => setIsShowLicensePlateOpen(false)}
              className="text-[#fff] text-[1.5rem] cursor-pointer"
            />
          </div>
        }
      >
        <div className="flex items-center justify-center bg-[#D7D2D4] rounded-2xl overflow-hidden">
          <img
            src="/src/assets/carp.png"
            alt=""
            width={"100%"}
            height={"100%"}
          />
        </div>
      </CustomModal>

      <CustomModal
        title={<div className="px-[20px] mb-[20px] pt-4">登記</div>}
        onCancle={() => setIsRegisterOpen(false)}
        onConfirm={() => setIsRegisterOpen(false)}
        open={isRegisterOpen}
        className={"resettingModalPadding rounded-2xl overflow-hidden"}
        modalWidth={"680px"}
        footer={
          <div className="py-4 bg-[#F6F8FC] rounded-b-md items-center flex justify-end">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(false)}
              className="ant-btn css-dev-only-do-not-override-9alsuj ant-btn-default w-[6rem] h-[2.75rem] mr-[1.5rem]"
            >
              <span>取 消</span>
            </button>
            <button
              type="button"
              onClick={() => setIsRegisterOpen(false)}
              className="ant-btn css-dev-only-do-not-override-9alsuj ant-btn-primary w-[6rem] h-[2.75rem] mr-[1.5rem] bg-[#2853E3]"
            >
              <span>確 定</span>
            </button>
          </div>
        }
      >
        <div className="py-[32px] border-t">
          <Form colon={false} className="ml-6">
            <FormItem
              name="id"
              label="車牌號碼"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 15 }}
            >
              <div>粵A C5635</div>
            </FormItem>
            <FormItem
              name="deviceType"
              label="車輛類型"
              rules={[{ required: true }]}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 15 }}
            >
              <Select
                suffixIcon={<img src={down} />}
                placeholder="請選擇"
                defaultActiveFirstOption
                options={[
                  { value: "請選擇", label: "請選擇" },
                  { value: "攝像頭", label: "攝像頭" },
                  { value: "大聲公", label: "大聲公" },
                ]}
              />
            </FormItem>
          </Form>
        </div>
      </CustomModal>

      <CustomModal
        title={<div>添加設備</div>}
        onCancle={() => setIsAddDeviceOpen(false)}
        onConfirm={() => setIsAddDeviceOpen(false)}
        open={isAddDeviceOpen}
        className={"customDeviceModal"}
        modalWidth={"680px"}
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
              suffixIcon={<img src={down} />}
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
