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
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CustomModal } from "@/components/custom-modal";

import downArrow from "../../assets/public/down-arrow.png";
import KEYS from "../../i18n/language/keys/monitor-keys";
import { useAction } from "./hook";
import {
  IMonitorConfigurationType,
  IMonitorDataType,
  IOpenOrStopStatus,
  IWarningType,
} from "./props";

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
    filterType,
  } = useAction();

  const columns: ColumnsType<IMonitorDataType> = [
    {
      title: `${t(KEYS.TITLE, source)}`,
      dataIndex: "title",
      width: "16.6%",
    },
    {
      title: `${t(KEYS.STATUS, source)}`,
      dataIndex: "condition",
      width: "16.6%",
      render: (_, record, index) => {
        return (
          <Tooltip
            placement="topLeft"
            title={
              record.condition
                ? `${t(KEYS.CLICK, source)} ${t(KEYS.DEACTIVATE, source)}`
                : `${t(KEYS.CLICK, source)} ${t(KEYS.ENABLE, source)}`
            }
          >
            <Switch
              checkedChildren={t(KEYS.ENABLE, source)}
              unCheckedChildren=""
              value={record.condition}
              onChange={(value) => {
                onChangeStatus(index, value);
              }}
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
      dataIndex: "warningType",
      width: "16.6%",
    },
    {
      title: `${t(KEYS.NOTIFICATION_OBJECT, source)}`,
      dataIndex: "notificationObject",
      width: "16.6%",
    },
    {
      title: `${t(KEYS.OPERATE, source)}`,
      dataIndex: "operate",
      width: "16.6%",
      render: (_, _record, index) => (
        <div className="flex-wrap flex">
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
            {t(KEYS.EDIT, source)}
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteIndex(index);
              setIsDeleteOpen(true);
            }}
          >
            {t(KEYS.DELETE, source)}
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
            {t(KEYS.MONITOR, source)}
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-between flex-wrap">
            <div>
              <Select
                className="mr-[1rem] w-[13.5rem]"
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
                className="w-[13.5rem]"
                placeholder={t(KEYS.ALERT_TYPE_FILTER, source)}
                defaultActiveFirstOption
                value={filterType}
                onChange={(value) => onFilterType(value)}
                options={[
                  {
                    value: IWarningType.All,
                    label: `${t(KEYS.ALL, source)}`,
                  },
                  {
                    value: IWarningType.IdentifyPersonnel,
                    label: `${t(KEYS.IDENTIFY_PEOPLE, source)}`,
                  },
                  {
                    value: IWarningType.IdentifyVehicle,
                    label: `${t(KEYS.IDENTIFY_VEHICLES, source)}`,
                  },
                  {
                    value: IWarningType.UnusualVehicle,
                    label: `${t(KEYS.IDENTIFY_ABNORMAL_VEHICLES, source)}`,
                  },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
            </div>
            <Button
              type="primary"
              className="h-[2.75rem] w-[5.5rem]"
              onClick={() => navigate("/monitor/add")}
            >
              <PlusOutlined className="pr-[.25rem]" />
              {t(KEYS.NEW, source)}
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
                <Trans
                  {...source}
                  i18nKey="Pagination"
                  ns="monitor"
                  values={{ count: data.length.toString() }}
                  components={{
                    span: <span className="text-[#2853E3]" />,
                  }}
                />
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
            {t(KEYS.OPERATION_CONFIRMATION, source)}
          </div>
        }
        onCancle={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
        }}
        open={isDeleteOpen}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {t(KEYS.DELETE_CONFIRM_CONTENT, source)}
        </span>
      </CustomModal>
    </ConfigProvider>
  );
};
