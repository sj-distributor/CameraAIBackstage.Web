import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Pagination,
  Select,
  Switch,
  Table,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import { CustomModal } from "@/components/custom-modal";

import downArrow from "../../assets/public/down-arrow.png";
import { useAction } from "./hook";
import { IMonitorConfigurationType, IMonitorDataType } from "./props";

export const Monitor = () => {
  const {
    data,
    isDeleteOpen,
    setIsDeleteOpen,
    setIsDeleteIndex,
    onChangeStatus,
  } = useAction();

  const columns: ColumnsType<IMonitorDataType> = [
    {
      title: "標題",
      dataIndex: "title",
      width: "16.6%",
    },
    {
      title: "狀態",
      dataIndex: "condition",
      width: "16.6%",
      render: (_, record, index) => {
        return (
          <Tooltip
            placement="topLeft"
            title={record.condition ? "點擊關閉" : "點擊啟用"}
          >
            <Switch
              checkedChildren="啟用"
              unCheckedChildren=""
              value={record.condition}
              onChange={(value) => {
                onChangeStatus(index, value);
              }}
              className="w-[3.125rem] text-[.625rem] customSwitch"
            />
          </Tooltip>
        );
      },
    },
    {
      title: "預警類型",
      dataIndex: "warningType",
      width: "16.6%",
    },
    {
      title: "通知對象",
      dataIndex: "notificationObject",
      width: "16.6%",
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
            onClick={() =>
              navigate("/monitor/configuration/" + "update" + "/" + index, {
                state: {
                  type: IMonitorConfigurationType.Update,
                  id: index,
                },
              })
            }
          >
            編輯
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteIndex(index);
              setIsDeleteOpen(true);
            }}
          >
            刪除
          </Button>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

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
            監測管理
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-between">
            <div>
              <Select
                className="mx-[1rem] w-[13.5rem]"
                placeholder="狀態"
                defaultActiveFirstOption
                options={[
                  { value: "狀態", label: "狀態" },
                  { value: "啟用", label: "啟用" },
                  { value: "關閉", label: "關閉" },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
              <Select
                className="w-[13.5rem]"
                placeholder="全部"
                defaultActiveFirstOption
                options={[
                  { value: "全部", label: "全部" },
                  { value: "識別人員", label: "識別人員" },
                  { value: "識別車輛", label: "識別車輛" },
                  { value: "識別異常車輛", label: "識別異常車輛" },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
            </div>
            <Button
              type="primary"
              className="h-[2.75rem] w-[5.5rem]"
              onClick={() => navigate("/monitor/add")}
            >
              <PlusOutlined className="pr-[.5rem]" />
              新增
            </Button>
          </div>
          <div className="flex flex-col h-[calc(100%-6rem)] justify-between pt-[1.125rem]">
            <Table
              rowKey={(record) => record.title}
              columns={columns}
              dataSource={data}
              className="pt-[1.125rem] tableHiddenScrollBar"
              scroll={{ y: 580 }}
              pagination={false}
            />
            <div className="flex justify-between items-center pt-[16px]">
              <div className="text-[#929292] text-[.875rem]">
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
      </div>

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            操作確認
          </div>
        }
        onCancle={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
        }}
        open={isDeleteOpen}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否刪除類型？</span>
      </CustomModal>
    </ConfigProvider>
  );
};
