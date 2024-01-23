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
import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/license-plate-management-keys";

import { IDataType } from "../../props";
import { useAction } from "./hook";

export const LicensePlateManagementTable = (props: {
  setShowWarningDetails: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) => {
  const { setShowWarningDetails } = props;

  const { t } = useAuth();

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
      title: t(KEYS.SERIAL_NUMBER, { ns: "licensePlateManagement" }),
      dataIndex: "deviceId",
      width: "16.6%",
    },
    {
      title: t(KEYS.LICENSE_PLATE_NUMBER, { ns: "licensePlateManagement" }),
      dataIndex: "isOnline",
      width: "16.6%",
      render: () => <div>粵C15468</div>,
    },
    {
      title: t(KEYS.START_TIME, { ns: "licensePlateManagement" }),
      dataIndex: "operate",
      width: "16.6%",
    },
    {
      title: t(KEYS.VEHICLE_TYPE, { ns: "licensePlateManagement" }),
      dataIndex: "equipmentName",
      width: "16.6%",
      render: (record: boolean) => (
        <div>
          {record ? (
            <div className="flex flex-row items-center">
              <div className="bg-[#34A46E] w-[6px] h-[6px] rounded-full mr-[8px]" />
              <span>{t(KEYS.ONLINE, { ns: "licensePlateManagement" })}</span>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <div className="bg-[#F04E4E] w-[6px] h-[6px] rounded-full mr-[8px]" />
              <span>{t(KEYS.OFFLINE, { ns: "licensePlateManagement" })}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: t(KEYS.OPERATION, { ns: "licensePlateManagement" }),
      dataIndex: "operate",
      width: "26.6%",
      render: (_, record, index) => (
        <div>
          <Button
            type="link"
            className="w-[96px]"
            onClick={() => setIsRegisterOpen(true)}
          >
            {t(KEYS.REGISTER, { ns: "licensePlateManagement" })}
          </Button>
          <Button
            type="link"
            className="w-[96px]"
            onClick={() => setShowWarningDetails(record.deviceId)}
          >
            {t(KEYS.VIEW_DETAILS, { ns: "licensePlateManagement" })}
          </Button>
          <Button
            type="link"
            className="w-[96px]"
            onClick={() => {
              setIsShowLicensePlateOpen(true);
            }}
          >
            {t(KEYS.LICENSE_PLATE_IMAGE, { ns: "licensePlateManagement" })}
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
              placeholder={t(KEYS.SEARCH_VEHICLE_NUMBER, {
                ns: "licensePlateManagement",
              })}
            />
            <Select
              className="mx-[16px] w-[216px]"
              placeholder={t(KEYS.LAST_WEEK, {
                ns: "licensePlateManagement",
              })}
              defaultActiveFirstOption
              options={[
                {
                  value: t(KEYS.LAST_WEEK, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.LAST_WEEK, {
                    ns: "licensePlateManagement",
                  }),
                },
                {
                  value: t(KEYS.LAST_MONTH, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.LAST_MONTH, {
                    ns: "licensePlateManagement",
                  }),
                },
                {
                  value: t(KEYS.LAST_THREE_MONTHS, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.LAST_THREE_MONTHS, {
                    ns: "licensePlateManagement",
                  }),
                },
                {
                  value: t(KEYS.CUSTOM_TIME_RANGE, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.LAST_MONTH, {
                    ns: "licensePlateManagement",
                  }),
                },
              ]}
              suffixIcon={<img src={down} />}
            />
            <Select
              className="w-[216px]"
              placeholder={t(KEYS.UNREGISTERED, {
                ns: "licensePlateManagement",
              })}
              defaultActiveFirstOption
              options={[
                {
                  value: t(KEYS.UNREGISTERED, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.UNREGISTERED, { ns: "licensePlateManagement" }),
                },
                {
                  value: t(KEYS.ABNORMAL_VEHICLES, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.ABNORMAL_VEHICLES, {
                    ns: "licensePlateManagement",
                  }),
                },
                {
                  value: t(KEYS.NORMAL_VEHICLES, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.NORMAL_VEHICLES, {
                    ns: "licensePlateManagement",
                  }),
                },
              ]}
              suffixIcon={<img src={down} />}
            />
          </div>
          <Button
            type="primary"
            className="h-[44px] max-w-max bg-[#2853E3] flex items-center"
            onClick={() => setIsAddDeviceOpen(true)}
          >
            <PlusOutlined className="pr-[8px]" />
            {t(KEYS.ADD_DEVICE, { ns: "licensePlateManagement" })}
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
            {t(KEYS.TOTAL, {
              ns: "licensePlateManagement",
            })}
            <span className="text-[#2853E3] font-light">{data.length}</span>{" "}
            {t(KEYS.ITEMS, {
              ns: "licensePlateManagement",
            })}
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
            {t(KEYS.CONFIRM_OPERATION, {
              ns: "licensePlateManagement",
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
        <span className="pl-[32px]">
          {t(KEYS.PLEASE_CONFIRM_UNBIND, {
            ns: "licensePlateManagement",
          })}
        </span>
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
        title={
          <div className="px-[20px] mb-[20px] pt-4">
            {t(KEYS.REGISTER, {
              ns: "licensePlateManagement",
            })}
          </div>
        }
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
              <span>
                {t(KEYS.CANCEL, {
                  ns: "licensePlateManagement",
                })}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsRegisterOpen(false)}
              className="ant-btn css-dev-only-do-not-override-9alsuj ant-btn-primary w-[6rem] h-[2.75rem] mr-[1.5rem] bg-[#2853E3]"
            >
              <span>
                {t(KEYS.CONFIRM, {
                  ns: "licensePlateManagement",
                })}
              </span>
            </button>
          </div>
        }
      >
        <div className="py-[32px] border-t">
          <Form colon={false} className="ml-6">
            <FormItem
              name="id"
              label={t(KEYS.LICENSE_PLATE_NUMBER, {
                ns: "licensePlateManagement",
              })}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 15 }}
            >
              <div>粵A C5635</div>
            </FormItem>
            <FormItem
              name="deviceType"
              label={t(KEYS.VEHICLE_TYPE, {
                ns: "licensePlateManagement",
              })}
              rules={[{ required: true }]}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 15 }}
            >
              <Select
                suffixIcon={<img src={down} />}
                placeholder={t(KEYS.PLEASE_SELECT, {
                  ns: "licensePlateManagement",
                })}
                defaultActiveFirstOption
                options={[
                  {
                    value: t(KEYS.PLEASE_SELECT, {
                      ns: "licensePlateManagement",
                    }),
                    label: t(KEYS.PLEASE_SELECT, {
                      ns: "licensePlateManagement",
                    }),
                  },
                  {
                    value: t(KEYS.CAMERA, { ns: "licensePlateManagement" }),
                    label: t(KEYS.CAMERA, { ns: "licensePlateManagement" }),
                  },
                  {
                    value: t(KEYS.SPEAKER, { ns: "licensePlateManagement" }),
                    label: t(KEYS.SPEAKER, { ns: "licensePlateManagement" }),
                  },
                ]}
              />
            </FormItem>
          </Form>
        </div>
      </CustomModal>

      <CustomModal
        title={
          <div>
            {t(KEYS.ADD_DEVICE, {
              ns: "licensePlateManagement",
            })}
          </div>
        }
        onCancle={() => setIsAddDeviceOpen(false)}
        onConfirm={() => setIsAddDeviceOpen(false)}
        open={isAddDeviceOpen}
        className={"customDeviceModal"}
        modalWidth={"680px"}
      >
        <Form colon={false}>
          <FormItem
            name="deviceId"
            label={t(KEYS.DEVICE_ID, {
              ns: "licensePlateManagement",
            })}
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
          >
            <Input
              placeholder={t(KEYS.PLEASE_ENTER, {
                ns: "licensePlateManagement",
              })}
            />
          </FormItem>
          <FormItem
            name="deviceType"
            label={t(KEYS.DEVICE_TYPE, {
              ns: "licensePlateManagement",
            })}
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
          >
            <Select
              suffixIcon={<img src={down} />}
              placeholder={t(KEYS.PLEASE_SELECT, {
                ns: "licensePlateManagement",
              })}
              defaultActiveFirstOption
              options={[
                {
                  value: t(KEYS.PLEASE_SELECT, {
                    ns: "licensePlateManagement",
                  }),
                  label: t(KEYS.PLEASE_SELECT, {
                    ns: "licensePlateManagement",
                  }),
                },
                {
                  value: t(KEYS.CAMERA, { ns: "licensePlateManagement" }),
                  label: t(KEYS.CAMERA, { ns: "licensePlateManagement" }),
                },
                {
                  value: t(KEYS.SPEAKER, { ns: "licensePlateManagement" }),
                  label: t(KEYS.SPEAKER, { ns: "licensePlateManagement" }),
                },
              ]}
            />
          </FormItem>
          <FormItem
            name="deviceName"
            label={t(KEYS.DEVICE_NAME, {
              ns: "licensePlateManagement",
            })}
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 15 }}
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder={t(KEYS.PLEASE_ENTER, {
                ns: "licensePlateManagement",
              })}
            />
          </FormItem>
        </Form>
      </CustomModal>
    </ConfigProvider>
  );
};
