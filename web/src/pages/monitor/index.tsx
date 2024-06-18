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
import { isEmpty } from "ramda";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CustomModal } from "@/components/custom-modal";
import {
  CameraAiMonitorType,
  CameraAiNotificationType,
  IMonitorSettingsDto,
} from "@/services/dtos/monitor";

import downArrow from "../../assets/public/down-arrow.png";
import CONFIGURATION_KEYS from "../../i18n/language/keys/monitor-configuration-keys";
import KEYS from "../../i18n/language/keys/monitor-keys";
import { BackGroundRolePermissionEnum } from "../user/user-permissions/user-newpermissions/props";
import { useAction } from "./hook";
import { IMonitorOptionDto, IOpenOrStopStatus } from "./props";

export const Monitor = () => {
  const {
    data,
    isDeleteOpen,
    setIsDeleteOpen,
    setIsDeleteIndex,
    onChangeStatus,
    t,
    source,
    language,
    onFilterStatus,
    onFilterType,
    filterStatus,
    myPermissions,
    pageDto,
    onChangePage,
    count,
    onDelete,
    loading,
    selectWarningType,
  } = useAction();

  const columns: ColumnsType<IMonitorSettingsDto> = [
    {
      title: `${t(KEYS.TITLE, source)}`,
      dataIndex: "title",
      width: "16.6%",
    },
    {
      title: `${t(KEYS.STATUS, source)}`,
      dataIndex: "isActive",
      width: "16.6%",
      render: (_, record) => {
        return (
          <Tooltip
            placement="topLeft"
            title={
              record.isActive
                ? `${t(KEYS.CLICK, source)} ${t(KEYS.DEACTIVATE, source)}`
                : `${t(KEYS.CLICK, source)} ${t(KEYS.ENABLE, source)}`
            }
          >
            <Switch
              checkedChildren={t(KEYS.ENABLE, source)}
              unCheckedChildren=""
              value={record.isActive}
              onChange={(value) => {
                onChangeStatus(record.id!, value);
              }}
              loading={record.loading}
              className={`${
                language === "ch" ? "w-[3.125rem]" : "w-[4rem]"
              } text-[.625rem] customSwitch`}
            />
          </Tooltip>
        );
      },
    },
    {
      title: `${t(KEYS.ALERT_TYPE, source)}`,
      dataIndex: "monitorTypes",
      width: "16.6%",
      render: (monitorTypes) => {
        const getMonitorTypeName = (type: CameraAiMonitorType) => {
          switch (type) {
            case CameraAiMonitorType.People:
              return t(KEYS.IDENTIFY_PEOPLE, source);

            case CameraAiMonitorType.Vehicles:
              return t(KEYS.IDENTIFY_VEHICLES, source);

            case CameraAiMonitorType.AbnormalVehicles:
              return t(KEYS.IDENTIFY_ABNORMAL_VEHICLES, source);

            case CameraAiMonitorType.Security:
              return t(KEYS.SECURITY, source);
          }
        };

        const monitorTypeNames = monitorTypes.map((type: CameraAiMonitorType) =>
          getMonitorTypeName(type)
        );

        return (
          <div>
            {monitorTypeNames.map((item: string, index: number) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: `${t(KEYS.NOTIFICATION_OBJECT, source)}`,
      dataIndex: "monitorNotifications",
      width: "16.6%",
      render: (_, record) => {
        const handleTitle = (type: CameraAiNotificationType) => {
          switch (type) {
            case CameraAiNotificationType.Email:
              return t(CONFIGURATION_KEYS.EMAIL, {
                ns: "monitorConfiguration",
              });
            case CameraAiNotificationType.PhoneCall:
              return t(CONFIGURATION_KEYS.TELEPHONE, {
                ns: "monitorConfiguration",
              });
            case CameraAiNotificationType.Sms:
              return t(CONFIGURATION_KEYS.SHORT_MESSAGE, {
                ns: "monitorConfiguration",
              });
            case CameraAiNotificationType.WorkWechat:
              return t(CONFIGURATION_KEYS.ENTERPRISE_WECHAT, {
                ns: "monitorConfiguration",
              });
          }
        };

        return (
          <div>
            {record.monitorNotifications.map(
              (item, index) =>
                !isEmpty(item.recipients) && (
                  <div className="break-normal md:break-all" key={index}>
                    <span className="text-nowrap">
                      {handleTitle(item.notifyType)}：
                    </span>
                    {item.recipients.map((nameItem, nameIndex) => (
                      <span
                        className="break-normal md:break-all"
                        key={nameIndex}
                      >
                        {nameItem.name}
                        {nameIndex !== item.recipients.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                )
            )}
          </div>
        );
      },
    },
    {
      title: `${t(KEYS.OPERATE, source)}`,
      key: "operate",
      width: "16.6%",
      render: (_, record) => (
        <div className="flex-wrap flex">
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanUpdateCameraAiMonitor
          ) && (
            <Button
              type="link"
              className="w-[6rem]"
              onClick={() => {
                navigate(
                  `/monitor/configuration/modify/` +
                    (record.id && record.id.toString())
                );
              }}
            >
              {t(KEYS.EDIT, source)}
            </Button>
          )}
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanDeleteCameraAiMonitor
          ) && (
            <Button
              type="link"
              className="w-[6rem]"
              onClick={() => {
                if (!record.id) return;
                setIsDeleteIndex(record.id);
                setIsDeleteOpen(true);
              }}
            >
              {t(KEYS.DELETE, source)}
            </Button>
          )}
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
        <div className="bg-white h-[calc(100vh-5.5rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            {t(KEYS.MONITOR, source)}
          </span>
          <div className="flex flex-row pt-[1.5rem] justify-between flex-wrap">
            <div>
              <Select
                className="mr-[1rem] w-[13.5rem] h-[2.5rem]"
                placeholder={t(KEYS.STATUS, source)}
                defaultActiveFirstOption
                value={filterStatus}
                onChange={(value) => {
                  onFilterStatus(value);
                }}
                options={[
                  {
                    value: IOpenOrStopStatus.None,
                    label: `${t(KEYS.STATUS, source)}`,
                  },
                  {
                    value: IOpenOrStopStatus.Enable,
                    label: `${t(KEYS.ENABLE, source)}`,
                  },
                  {
                    value: IOpenOrStopStatus.Deactivate,
                    label: `${t(KEYS.DEACTIVATE, source)}`,
                  },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
              <Select
                className="w-[13.5rem] h-[2.5rem]"
                placeholder={t(KEYS.ALERT_TYPE_FILTER, source)}
                maxTagCount="responsive"
                defaultActiveFirstOption
                value={selectWarningType}
                mode="multiple"
                onChange={(_, option) =>
                  onFilterType(option as IMonitorOptionDto[])
                }
                options={[
                  {
                    value: CameraAiMonitorType.All,
                    label: `${t(KEYS.ALL, source)}`,
                  },
                  {
                    value: CameraAiMonitorType.People,
                    label: `${t(KEYS.IDENTIFY_PEOPLE, source)}`,
                  },
                  {
                    value: CameraAiMonitorType.Vehicles,
                    label: `${t(KEYS.IDENTIFY_VEHICLES, source)}`,
                  },
                  {
                    value: CameraAiMonitorType.AbnormalVehicles,
                    label: `${t(KEYS.IDENTIFY_ABNORMAL_VEHICLES, source)}`,
                  },
                  {
                    value: CameraAiMonitorType.Security,
                    label: `${t(KEYS.SECURITY, source)}`,
                  },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
            </div>
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanAddCameraAiMonitor
            ) && (
              <Button
                type="primary"
                className="h-[2.75rem] w-[5.5rem]"
                onClick={() => navigate("/monitor/add")}
              >
                <PlusOutlined className="pr-[.25rem]" />
                {t(KEYS.NEW, source)}
              </Button>
            )}
          </div>
          <div className="flex flex-col h-[calc(100%-5.8rem)] justify-between pt-[1rem]">
            <Table
              rowKey={(record) => record.id?.toString() ?? ""}
              columns={columns}
              dataSource={data}
              className="pt-[1.125rem] tableHiddenScrollBar"
              scroll={{ y: 550, x: 580 }}
              pagination={false}
              loading={loading}
            />
            <div className="flex justify-between items-center pt-[1rem]">
              <div className="text-[#929292] text-[.875rem]">
                <Trans
                  {...source}
                  i18nKey="Pagination"
                  ns="monitor"
                  values={{ count: count.toString() }}
                  components={{
                    span: <span className="text-[#2853E3] font-light mx-1" />,
                  }}
                />
              </div>
              <div>
                <Pagination
                  current={pageDto.PageIndex}
                  pageSize={pageDto.PageSize}
                  pageSizeOptions={[5, 10, 20]}
                  total={count}
                  showQuickJumper
                  showSizeChanger
                  onChange={(page, pageSize) => {
                    onChangePage(page, pageSize);
                  }}
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
            {t(KEYS.OPERATION_CONFIRMATION, source)}
          </div>
        }
        onCancle={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          onDelete();
        }}
        open={isDeleteOpen}
        className={"customModal"}
        confirmLoading={loading}
      >
        <span className="pl-[2rem]">
          {t(KEYS.DELETE_CONFIRM_CONTENT, source)}
        </span>
      </CustomModal>
    </ConfigProvider>
  );
};
