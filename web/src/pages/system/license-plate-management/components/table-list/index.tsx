import {
  CalendarOutlined,
  ClockCircleFilled,
  CloseCircleOutlined,
  CloseOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Pagination,
  Select,
  Table,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { Trans } from "react-i18next";

import down from "@/assets/public/down-arrow.png";
import search from "@/assets/public/search.png";
import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/license-plate-management-keys";
import LOG_KEYS from "@/i18n/language/keys/operation-log-keys";
import {
  CameraAiMonitorRecordStatus,
  IRegisteredVehicleListItem,
  IVehicleMonitorRecordsItem,
} from "@/services/dtos/license-plate-management";

import { useAction } from "./hook";
import {
  ICameraAiMonitorRecordStatusOption,
  ILicensePlateManagementTableProps,
} from "./props";

export const LicensePlateManagementTable = (
  props: ILicensePlateManagementTableProps
) => {
  const { setShowWarningDetails, setIsRegisteredVehicle, isRegisteredVehicle } =
    props;

  const { RangePicker } = DatePicker;

  const {
    t,
    registerForm,
    language,
    plateNumberKeyword,
    isUnbindOpen,
    isShowLicensePlateOpen,
    isRegisterOpen,
    isAddDeviceOpen,
    vehicleMonitorRecordsData,
    source,
    isGetMonitorRecords,
    dateRange,
    rangePresets,
    licensePlateImageUrl,
    registeredVehicleData,
    isGetRegisteredVehicleList,
    registeredVehicleRequest,
    vehicleMonitorRecordsRequest,
    registerCarNumber,
    isRegisteringCar,
    registeringCarRequest,
    setLicensePlateImageUrl,
    onRangeChange,
    setVehicleMonitorRecordsRequest,
    setRegisteredVehicleRequest,
    setPlateNumberKeyword,
    setIsUnbindOpen,
    setIsShowLicensePlateOpen,
    setIsRegisterOpen,
    setIsAddDeviceOpen,
    setRegisterCarNumber,
    setRegisteringCarRequest,
    handelRegisteringCar,
  } = useAction(props);

  const getCameraAiMonitorRecordStatusNode = (
    status: CameraAiMonitorRecordStatus
  ) => {
    switch (status) {
      case CameraAiMonitorRecordStatus.Verified:
        return (
          <div className="flex flex-row items-center">
            <div className="bg-[#34A46E] w-1.5 h-1.5 rounded-full mr-2" />
            <span>{t(KEYS.ONLINE, source)}</span>
          </div>
        );
      case CameraAiMonitorRecordStatus.Unmarked:
        return (
          <div className="flex flex-row items-center">
            <div className="bg-[#9D9FB0] w-1.5 h-1.5 rounded-full mr-2" />
            <span>{t(KEYS.UNREGISTERED, source)}</span>
          </div>
        );
      case CameraAiMonitorRecordStatus.Exception:
        return (
          <div className="flex flex-row items-center">
            <div className="bg-[#F04E4E] w-1.5 h-1.5 rounded-full mr-2" />
            <span>{t(KEYS.ABNORMAL_VEHICLES, source)}</span>
          </div>
        );

      default:
        return (
          <div className="flex flex-row items-center">
            <div className="bg-[#F04E4E] w-1.5 h-1.5 rounded-full mr-2" />
            <span>{t(KEYS.ABNORMAL_VEHICLES, source)}</span>
          </div>
        );
    }
  };

  const columns: ColumnsType<IVehicleMonitorRecordsItem> = [
    {
      title: t(KEYS.SERIAL_NUMBER, source),
      dataIndex: "id",
      width: "16.6%",
    },
    {
      title: t(KEYS.LICENSE_PLATE_NUMBER, source),
      dataIndex: "plateNumber",
      width: "16.6%",
    },
    {
      title: t(KEYS.START_TIME, source),
      dataIndex: "occurrenceTime",
      width: "16.6%",
      render: (time) => {
        return <div>{time ? dayjs(time).format("YYYY-MM-DD HH:mm") : ""}</div>;
      },
    },
    {
      title: t(KEYS.VEHICLE_TYPE, source),
      dataIndex: "status",
      width: "16.6%",
      render: (status: CameraAiMonitorRecordStatus) => {
        return getCameraAiMonitorRecordStatusNode(status);
      },
    },
    {
      title: t(KEYS.OPERATION, source),
      dataIndex: "operate",
      width: "26.6%",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setRegisterCarNumber(record.plateNumber);
              setRegisteringCarRequest((prev) => ({
                ...prev,
                recordId: String(record.id),
              }));
              setIsRegisterOpen(true);
            }}
          >
            {t(KEYS.REGISTER, source)}
          </Button>
          <Button
            type="link"
            onClick={() => setShowWarningDetails(String(record.id))}
          >
            {t(KEYS.VIEW_DETAILS, source)}
          </Button>
          <Button
            type="link"
            onClick={() => {
              setIsShowLicensePlateOpen(true);
              setLicensePlateImageUrl(record.licensePlateImageUrl);
            }}
          >
            {t(KEYS.LICENSE_PLATE_IMAGE, source)}
          </Button>
        </div>
      ),
    },
  ];

  const registeredColumns: ColumnsType<IRegisteredVehicleListItem> = [
    {
      title: t(KEYS.SERIAL_NUMBER, source),
      dataIndex: "id",
      width: "16.6%",
    },
    {
      title: t(KEYS.LICENSE_PLATE_NUMBER, source),
      dataIndex: "plateNumber",
      width: "16.6%",
    },
    {
      title: t(KEYS.START_TIME, source),
      dataIndex: "createdTime",
      width: "16.6%",
      render: (time) => {
        return <div>{time ? dayjs(time).format("YYYY-MM-DD HH:mm") : ""}</div>;
      },
    },
    {
      title: t(KEYS.VEHICLE_TYPE, source),
      dataIndex: "registeredRecordStatus",
      width: "16.6%",
      render: (status: CameraAiMonitorRecordStatus) => {
        return getCameraAiMonitorRecordStatusNode(status);
      },
    },
    {
      title: t(KEYS.OPERATION, source),
      dataIndex: "operate",
      width: "26.6%",
      render: () => (
        <div>
          <Button type="link" onClick={() => setIsRegisterOpen(true)}>
            {t(KEYS.EDIT, source)}
          </Button>
          <Button
            type="link"
            onClick={() => {
              setIsShowLicensePlateOpen(true);
            }}
          >
            {t(KEYS.LICENSE_PLATE_IMAGE, source)}
          </Button>
          <Button
            type="link"
            onClick={() => {
              setIsShowLicensePlateOpen(true);
            }}
          >
            {t(KEYS.DELETE, source)}
          </Button>
        </div>
      ),
    },
  ];

  const statusOption: ICameraAiMonitorRecordStatusOption[] = [
    {
      value: CameraAiMonitorRecordStatus.Unmarked,
      label: t(KEYS.UNREGISTERED, source),
    },
    {
      value: CameraAiMonitorRecordStatus.Exception,
      label: t(KEYS.ABNORMAL_VEHICLES, source),
    },
    {
      value: CameraAiMonitorRecordStatus.Verified,
      label: t(KEYS.NORMAL_VEHICLES, source),
    },
  ];

  const renderDateAndTime = (date: Dayjs | null) => (
    <>
      <span>
        <CalendarOutlined className="mr-2" />
        {date?.format("YYYY-MM-DD")}
      </span>
      <span className="text-[#666774]">
        <ClockCircleFilled className="mr-2" />
        {date?.format("HH:mm:ss")}
      </span>
    </>
  );

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
      <div className="flex flex-col flex-1">
        <div className="flex flex-row pt-[1.625rem] justify-between">
          <div className="flex flex-wrap gap-4">
            <Input
              className="w-[17.5rem] h-[2.5rem]"
              suffix={<img src={search} />}
              allowClear
              placeholder={t(KEYS.SEARCH_VEHICLE_NUMBER, source)}
              onChange={(e) => setPlateNumberKeyword(e.target.value)}
              value={
                !vehicleMonitorRecordsRequest.PlateNumber &&
                !registeredVehicleRequest.PlateNumber
                  ? undefined
                  : plateNumberKeyword
              }
              onPressEnter={(e) => {
                isRegisteredVehicle
                  ? setRegisteredVehicleRequest((prev) => ({
                      ...prev,
                      PlateNumber: e.currentTarget.value,
                    }))
                  : setVehicleMonitorRecordsRequest((prev) => ({
                      ...prev,
                      PlateNumber: e.currentTarget.value,
                    }));
              }}
            />
            <RangePicker
              className="w-[18.75rem] h-[2.5rem]"
              presets={rangePresets}
              value={dateRange}
              onChange={onRangeChange}
              renderExtraFooter={() => (
                <div className="flex justify-between">
                  {renderDateAndTime(dateRange ? dateRange[0] : null)}
                  {renderDateAndTime(dateRange ? dateRange[1] : null)}
                </div>
              )}
              allowClear
              placeholder={[
                t(LOG_KEYS.START_DATE, { ns: "operationLog" }),
                t(LOG_KEYS.END_DATE, { ns: "operationLog" }),
              ]}
            />
            {!isRegisteredVehicle && (
              <Select
                className="w-[13.5rem] h-[2.5rem]"
                placeholder={t(KEYS.UNREGISTERED, source)}
                defaultActiveFirstOption
                onChange={(status) => {
                  setVehicleMonitorRecordsRequest((prev) => ({
                    ...prev,
                    Status: status,
                  }));
                }}
                options={statusOption}
                suffixIcon={<img src={down} />}
              />
            )}
          </div>
          {!isRegisteredVehicle && (
            <Button
              type="primary"
              className="h-[2.5rem] max-w-max bg-[#2853E3] flex items-center"
              onClick={() => setIsRegisteredVehicle(true)}
            >
              {t(KEYS.REGISTERED_VEHICLES, source)}
            </Button>
          )}
        </div>
        {isRegisteredVehicle ? (
          <Table
            rowKey={(record) => record.id}
            columns={registeredColumns}
            dataSource={registeredVehicleData.registers}
            loading={isGetRegisteredVehicleList}
            className="pt-[1.125rem] tableHiddenScrollBar flex-1"
            scroll={{ y: 580 }}
            pagination={false}
          />
        ) : (
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={vehicleMonitorRecordsData.records}
            loading={isGetMonitorRecords}
            className="pt-[1.125rem] tableHiddenScrollBar flex-1"
            scroll={{ y: 580 }}
            pagination={false}
          />
        )}
        <div className="flex justify-between items-center pt-[1rem]">
          <div className="text-[#929292] text-[0.875rem] font-light">
            <Trans
              {...source}
              i18nKey="TotalItems"
              values={{
                length: isRegisteredVehicle
                  ? registeredVehicleData.count
                  : vehicleMonitorRecordsData.count,
              }}
              components={{
                span: <span className="text-[#2853E3]" />,
              }}
            />
          </div>
          <div>
            <Pagination
              current={1}
              pageSize={20}
              pageSizeOptions={[5, 10, 20]}
              total={
                isRegisteredVehicle
                  ? registeredVehicleData.count
                  : vehicleMonitorRecordsData.count
              }
              showQuickJumper
              showSizeChanger
              onChange={(page, pageSize) => {
                isRegisteredVehicle
                  ? setRegisteredVehicleRequest((prev) => ({
                      ...prev,
                      PageIndex: page,
                      PageSize: pageSize,
                    }))
                  : setVehicleMonitorRecordsRequest((prev) => ({
                      ...prev,
                      PageIndex: page,
                      PageSize: pageSize,
                    }));
              }}
            />
          </div>
        </div>
      </div>

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[0.625rem]" />
            {t(KEYS.CONFIRM_OPERATION, source)}
          </div>
        }
        onCancle={() => setIsUnbindOpen(false)}
        onConfirm={() => {
          // const newList = clone(vehicleMonitorRecordsData);

          // newList[isUnbindIndex].whetherToBind = false;
          // setData(newList);
          setIsUnbindOpen(false);
        }}
        open={isUnbindOpen}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {t(KEYS.PLEASE_CONFIRM_UNBIND, source)}
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
        modalWidth="69rem"
        footer={
          <div className="text-center absolute button-4 inset-x-0">
            <CloseCircleOutlined
              onClick={() => setIsShowLicensePlateOpen(false)}
              className="text-[#fff] text-[1.5rem] cursor-pointer"
            />
          </div>
        }
      >
        <div className="flex items-center justify-center bg-[#D7D2D4] rounded-2xl overflow-hidden w-[69rem] h-[38rem]">
          <img
            src={licensePlateImageUrl}
            alt="圖片加載異常"
            width={"100%"}
            height={"100%"}
          />
        </div>
      </CustomModal>

      <CustomModal
        title={
          <div className="px-[1.25rem] mb-[1.25rem] pt-4 text-[#323444] text-xl flex justify-between items-center">
            <div>
              {t(isRegisteredVehicle ? KEYS.EDIT : KEYS.REGISTER, source)}
            </div>
            <CloseOutlined onClick={() => setIsRegisterOpen(false)} />
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
              <span>{t(KEYS.CANCEL, source)}</span>
            </button>
            <Button
              loading={isRegisteringCar}
              onClick={() => {
                registerForm
                  .validateFields()
                  .then(() => {
                    handelRegisteringCar(registeringCarRequest);
                  })
                  .catch(() => {});
              }}
              className="ant-btn css-dev-only-do-not-override-9alsuj ant-btn-primary w-[6rem] h-[2.75rem] mr-[1.5rem] bg-[#2853E3]"
            >
              <span>{t(KEYS.CONFIRM, source)}</span>
            </Button>
          </div>
        }
      >
        <div className="py-[2rem] border-t">
          <Form colon={false} form={registerForm} className="ml-6">
            <FormItem
              name="id"
              label={t(KEYS.LICENSE_PLATE_NUMBER, source)}
              labelCol={{ span: language === "ch" ? 3 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <div>{registerCarNumber}</div>
            </FormItem>
            <FormItem
              name="deviceType"
              label={t(KEYS.VEHICLE_TYPE, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 3 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <Select
                suffixIcon={<img src={down} />}
                placeholder={t(KEYS.PLEASE_SELECT, source)}
                defaultActiveFirstOption
                options={statusOption.filter(
                  (item) => item.value !== CameraAiMonitorRecordStatus.Unmarked
                )}
                onChange={(status) =>
                  setRegisteringCarRequest((prev) => ({
                    ...prev,
                    recordStatus: status,
                  }))
                }
              />
            </FormItem>
            <FormItem
              name="exceptionReason"
              label={t(KEYS.ABNORMAL_CAUSE, source)}
              labelCol={{ span: language === "ch" ? 3 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <TextArea
                rows={4}
                onChange={(e) =>
                  setRegisteringCarRequest((prev) => ({
                    ...prev,
                    exceptionReason: e.target.value,
                  }))
                }
              />
            </FormItem>
          </Form>
        </div>
      </CustomModal>

      <CustomModal
        title={<div>{t(KEYS.ADD_DEVICE, source)}</div>}
        onCancle={() => setIsAddDeviceOpen(false)}
        onConfirm={() => setIsAddDeviceOpen(false)}
        open={isAddDeviceOpen}
        className={"customDeviceModal"}
        modalWidth="42.5rem"
      >
        <Form colon={false}>
          <FormItem
            name="deviceId"
            label={t(KEYS.DEVICE_ID, source)}
            rules={[{ required: true }]}
            labelCol={{ span: language === "ch" ? 3 : 5 }}
            wrapperCol={{ span: 15 }}
          >
            <Input placeholder={t(KEYS.PLEASE_ENTER, source)} />
          </FormItem>
          <FormItem
            name="deviceType"
            label={t(KEYS.DEVICE_TYPE, source)}
            rules={[{ required: true }]}
            labelCol={{ span: language === "ch" ? 3 : 5 }}
            wrapperCol={{ span: 15 }}
          >
            <Select
              suffixIcon={<img src={down} />}
              placeholder={t(KEYS.PLEASE_SELECT, source)}
              defaultActiveFirstOption
              options={[
                {
                  value: t(KEYS.PLEASE_SELECT, source),
                  label: t(KEYS.PLEASE_SELECT, source),
                },
                {
                  value: t(KEYS.CAMERA, source),
                  label: t(KEYS.CAMERA, source),
                },
                {
                  value: t(KEYS.SPEAKER, source),
                  label: t(KEYS.SPEAKER, source),
                },
              ]}
            />
          </FormItem>
          <FormItem
            name="deviceName"
            label={t(KEYS.DEVICE_NAME, source)}
            rules={[{ required: true }]}
            labelCol={{ span: language === "ch" ? 3 : 5 }}
            wrapperCol={{ span: 15 }}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder={t(KEYS.PLEASE_ENTER, source)} />
          </FormItem>
        </Form>
      </CustomModal>
    </ConfigProvider>
  );
};
