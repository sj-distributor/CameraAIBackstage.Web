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
import KEYS from "@/i18n/language/keys/equipment-list-keys";

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
    t,
  } = useAction();

  const columns: ColumnsType<IDataType> = [
    {
      title: t(KEYS.DEVICE_ID, { ns: "equipmentList" }),
      dataIndex: "deviceId",
      width: "16.6%",
    },
    {
      title: t(KEYS.IS_ONLINE, { ns: "equipmentList" }),
      dataIndex: "isOnline",
      width: "16.6%",
      render: (record: boolean) => (
        <div>
          {record ? (
            <div className="flex flex-row items-center">
              <div className="bg-[#34A46E] w-[.375rem] h-[.375rem] rounded-full mr-[.5rem]" />
              <span>{t(KEYS.ONLINE, { ns: "equipmentList" })}</span>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <div className="bg-[#F04E4E] min-w-[.375rem] max-w-[.375rem] h-[.375rem] rounded-full mr-[.5rem]" />
              <span className="whitespace-nowrap">
                {t(KEYS.OFFLINE, { ns: "equipmentList" })}
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: t(KEYS.DEVICE_TYPE, { ns: "equipmentList" }),
      dataIndex: "deviceType",
      width: "16.6%",
    },
    {
      title: t(KEYS.DEVICE_NAME, { ns: "equipmentList" }),
      dataIndex: "equipmentName",
      width: "16.6%",
    },
    {
      title: t(KEYS.IS_BLIND, { ns: "equipmentList" }),
      dataIndex: "whetherToBind",
      width: "16.6%",
      render: (_, record, index) => {
        return (
          <Tooltip
            placement="topLeft"
            title={t(record ? KEYS.CLICK_TO_UNBIND : KEYS.CLICK_TO_BIND, {
              ns: "equipmentList",
            })}
          >
            <Switch
              checkedChildren={t(KEYS.BINDING, { ns: "equipmentList" })}
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
      title: t(KEYS.OPERATE, { ns: "equipmentList" }),
      dataIndex: "operate",
      width: "16.6%",
      render: (_, __, index) => (
        <div>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => setIsBindingOpen(true)}
          >
            {t(KEYS.EDIT, { ns: "equipmentList" })}
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteIndex(index);
              setIsDeleteDeviceOpen(true);
            }}
          >
            {t(KEYS.DELETE, { ns: "equipmentList" })}
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
      title: t(KEYS.AREA_ID, { ns: "equipmentList" }),
      dataIndex: "areaId",
      width: "9.5rem",
    },
    {
      title: t(KEYS.AREA_NAME, { ns: "equipmentList" }),
      dataIndex: "areaName",
      width: "9.5rem",
    },
    {
      title: t(KEYS.AREA_ADDRESS, { ns: "equipmentList" }),
      dataIndex: "areaAddress",
      width: "24.875rem",
    },
    {
      title: t(KEYS.PRINCIPAL, { ns: "equipmentList" }),
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
            {t(KEYS.DEVICE_LIST, { ns: "equipmentList" })}
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-between">
            <div>
              <Input
                className="w-[17.5rem]"
                suffix={<img src={search} />}
                placeholder={t(KEYS.SEARCH_DEVICE_ID_DEVICE_TYPE_DEVICE_NAME, {
                  ns: "equipmentList",
                })}
              />
              <Select
                className="mx-[1rem] w-[13.5rem]"
                placeholder={t(KEYS.IS_ONLINE, {
                  ns: "equipmentList",
                })}
                defaultActiveFirstOption
                options={[
                  {
                    value: "是否在線",
                    label: t(KEYS.IS_ONLINE, { ns: "equipmentList" }),
                  },
                  {
                    value: "在線",
                    label: t(KEYS.ONLINE, { ns: "equipmentList" }),
                  },
                  {
                    value: "離線",
                    label: t(KEYS.OFFLINE, { ns: "equipmentList" }),
                  },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
              <Select
                className="w-[13.5rem]"
                placeholder={t(KEYS.IS_CONFIRM, {
                  ns: "equipmentList",
                })}
                defaultActiveFirstOption
                options={[
                  {
                    value: "是否確定",
                    label: t(KEYS.IS_CONFIRM, { ns: "equipmentList" }),
                  },
                  {
                    value: "已綁定",
                    label: t(KEYS.BOUND, { ns: "equipmentList" }),
                  },
                  {
                    value: "未綁定",
                    label: t(KEYS.NOT_BOUND, { ns: "equipmentList" }),
                  },
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
              {t(KEYS.ADD_DEVICE, {
                ns: "equipmentList",
              })}
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
            {t(KEYS.OPERATION_CONFIRMATION, {
              ns: "equipmentList",
            })}
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
        <span className="pl-[2rem]">
          {t(KEYS.PLEASE_CONFIRM_WHETHER_TO_UNBIND, {
            ns: "equipmentList",
          })}
        </span>
      </CustomModal>

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRMATION, {
              ns: "equipmentList",
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
            ns: "equipmentList",
          })}
        </span>
      </CustomModal>

      <CustomModal
        title={
          <div>
            {t(KEYS.DEVICE_BINDING, {
              ns: "equipmentList",
            })}
          </div>
        }
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
        title={
          <div>
            {t(KEYS.ADD_DEVICE, {
              ns: "equipmentList",
            })}
          </div>
        }
        onCancle={() => setIsAddDeviceOpen(false)}
        onConfirm={() => setIsAddDeviceOpen(false)}
        open={isAddDeviceOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
      >
        <Form colon={false}>
          <FormItem
            name="deviceId"
            label={t(KEYS.DEVICE_ID, {
              ns: "equipmentList",
            })}
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
          >
            <Input
              placeholder={t(KEYS.PLEASE_INPUT, {
                ns: "equipmentList",
              })}
            />
          </FormItem>
          <FormItem
            name="deviceType"
            label={t(KEYS.DEVICE_TYPE, {
              ns: "equipmentList",
            })}
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
          >
            <Select
              suffixIcon={<img src={downArrow} />}
              placeholder={t(KEYS.PLEASE_SELECT, {
                ns: "equipmentList",
              })}
              defaultActiveFirstOption
              options={[
                {
                  value: "請選擇",
                  label: t(KEYS.PLEASE_SELECT, { ns: "equipmentList" }),
                },
                {
                  value: "攝像頭",
                  label: t(KEYS.CAMERA, { ns: "equipmentList" }),
                },
                {
                  value: "大聲公",
                  label: t(KEYS.LOUD_SPEAKER, { ns: "equipmentList" }),
                },
              ]}
            />
          </FormItem>
          <FormItem
            name="deviceName"
            label={t(KEYS.DEVICE_NAME, {
              ns: "equipmentList",
            })}
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder={t(KEYS.PLEASE_INPUT, {
                ns: "equipmentList",
              })}
            />
          </FormItem>
        </Form>
      </CustomModal>
    </ConfigProvider>
  );
};
