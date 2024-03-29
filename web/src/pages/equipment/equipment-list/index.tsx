import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Radio,
  Select,
  Spin,
  Switch,
  Table,
  Tooltip,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import type { ColumnsType } from "antd/es/table";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/equipment-list-keys";
import { BackGroundRolePermissionEnum } from "@/pages/user/user-permissions/user-newpermissions/props";
import { IEquipmentList, IRegionDto } from "@/services/dtos/equipment/list";

import downArrow from "../../../assets/public/down-arrow.png";
import search from "../../../assets/public/search.png";
import { useAction } from "./hook";
import { IBondOrNot, IOnlineOrNot } from "./props";

export const EquipmentList = () => {
  const {
    source,
    isUnbindOpen,
    setIsUnbindOpen,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isBindingOpen,
    setIsBindingOpen,
    isAddOrUpdateOpen,
    setIsAddOrUpdateOpen,
    setBindId,
    setIsDeleteId,
    data,
    t,
    setPageDto,
    searchKey,
    setSearchKey,
    isSearchOnline,
    setIsSearchOnline,
    isSearchBind,
    setIsSearchBind,
    onAddOrUpdateSubmit,
    form,
    equipmentTypesOption,
    dataTotalCount,
    loading,
    bindAreaId,
    setBindAreaId,
    onDelete,
    isAddOrEdit,
    setIsAddOrEdit,
    onGetEquipmentInformationById,
    editLoding,
    language,
    onOpenBind,
    regionLoading,
    regionData,
    onConfirmBind,
    confirmLoading,
    pageDto,
    onConfirmUnBind,
    myPermissions,
    initialEquipmentData,
  } = useAction();

  const columns: ColumnsType<IEquipmentList> = [
    {
      title: t(KEYS.DEVICE_ID, source),
      dataIndex: "id",
      width: "16.6%",
    },
    {
      title: t(KEYS.IS_ONLINE, source),
      dataIndex: "isOnline",
      width: "16.6%",
      render: (record: boolean) => (
        <div>
          {record ? (
            <div className="flex flex-row items-center">
              <div className="bg-[#34A46E] w-[.375rem] h-[.375rem] rounded-full mr-[.5rem]" />
              <span>{t(KEYS.ONLINE, source)}</span>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <div className="bg-[#F04E4E] min-w-[.375rem] max-w-[.375rem] h-[.375rem] rounded-full mr-[.5rem]" />
              <span className="whitespace-nowrap">
                {t(KEYS.OFFLINE, source)}
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: t(KEYS.DEVICE_TYPE, source),
      dataIndex: "equipmentTypeId",
      width: "16.6%",
      render: (value) => {
        return equipmentTypesOption.find((x) => x.value === value)?.label;
      },
    },
    {
      title: t(KEYS.DEVICE_NAME, source),
      dataIndex: "equipmentName",
      width: "16.6%",
    },
    {
      title: t(KEYS.IS_BLIND, source),
      dataIndex: "isBind",
      width: "16.6%",
      render: (_, record, index) => {
        return (
          <Tooltip
            placement="topLeft"
            title={t(
              record ? KEYS.CLICK_TO_UNBIND : KEYS.CLICK_TO_BIND,
              source
            )}
          >
            <Switch
              checkedChildren={t(KEYS.BINDING, source)}
              value={record.isBind}
              onChange={(value) => {
                setBindId(record.id);

                if (data[index].isBind && !value) {
                  myPermissions.includes(
                    BackGroundRolePermissionEnum.CanUnBindCameraAiEquipment
                  ) && setIsUnbindOpen(true);
                } else if (
                  myPermissions.includes(
                    BackGroundRolePermissionEnum.CanBindCameraAiEquipment
                  )
                ) {
                  setIsBindingOpen(true);
                  onOpenBind();
                }
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
      title: t(KEYS.OPERATE, source),
      dataIndex: "operate",
      width: "16.6%",
      render: (_, record) => (
        <div>
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanUpdateCameraAiEquipment
          ) && (
            <Button
              type="link"
              className="w-[6rem]"
              onClick={() => {
                onGetEquipmentInformationById(record.id);
                setIsAddOrEdit(false);
                setIsAddOrUpdateOpen(true);
              }}
            >
              {t(KEYS.EDIT, source)}
            </Button>
          )}
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanDeleteCameraAiEquipment
          ) && (
            <Button
              type="link"
              className="w-[6rem]"
              onClick={() => {
                setIsDeleteId(record.id);
                setIsDeleteDeviceOpen(true);
              }}
            >
              {t(KEYS.DELETE, source)}
            </Button>
          )}
        </div>
      ),
    },
  ];

  const deviceColumns: ColumnsType<IRegionDto> = [
    {
      title: "",
      dataIndex: "radio",
      width: "3.625rem",
      render: (_, record) => {
        return (
          <Radio
            value={record.radio}
            onChange={() => {
              setBindAreaId(record.areaId);
            }}
            checked={bindAreaId === record.areaId}
          />
        );
      },
    },
    {
      title: t(KEYS.AREA_ID, source),
      dataIndex: "areaId",
      width: "9.5rem",
    },
    {
      title: t(KEYS.AREA_NAME, source),
      dataIndex: "areaName",
      width: "9.5rem",
    },
    {
      title: t(KEYS.AREA_ADDRESS, source),
      dataIndex: "regionAddress",
      width: "24.875rem",
    },
    {
      title: t(KEYS.PRINCIPAL, source),
      dataIndex: "principal",
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
            {t(KEYS.DEVICE_LIST, source)}
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-between">
            <div>
              <Input
                className="w-[17.5rem] h-[2.75rem]"
                suffix={<img src={search} />}
                placeholder={t(
                  KEYS.SEARCH_DEVICE_ID_DEVICE_TYPE_DEVICE_NAME,
                  source
                )}
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
              <Select
                className="mx-[1rem] w-[13.5rem] h-[2.75rem]"
                placeholder={t(KEYS.IS_ONLINE, source)}
                value={isSearchOnline}
                onChange={(value) => {
                  setIsSearchOnline(
                    value !== IOnlineOrNot.All ? value : undefined
                  );
                }}
                defaultActiveFirstOption
                options={[
                  {
                    value: IOnlineOrNot.All,
                    label: t(KEYS.IS_ONLINE, source),
                  },
                  {
                    value: IOnlineOrNot.Online,
                    label: t(KEYS.ONLINE, source),
                  },
                  {
                    value: IOnlineOrNot.OffOnline,
                    label: t(KEYS.OFFLINE, source),
                  },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
              <Select
                className="w-[13.5rem] h-[2.75rem]"
                placeholder={t(KEYS.IS_BLIND, source)}
                defaultActiveFirstOption
                value={isSearchBind}
                onChange={(value) => {
                  setIsSearchBind(value !== IBondOrNot.All ? value : undefined);
                }}
                options={[
                  {
                    value: IBondOrNot.All,
                    label: t(KEYS.IS_BLIND, source),
                  },
                  {
                    value: IBondOrNot.Bond,
                    label: t(KEYS.BOUND, source),
                  },
                  {
                    value: IBondOrNot.NotBond,
                    label: t(KEYS.NOT_BOUND, source),
                  },
                ]}
                suffixIcon={<img src={downArrow} />}
              />
            </div>
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanAddCameraAiEquipment
            ) && (
              <Button
                type="primary"
                className="h-[2.75rem]"
                onClick={() => {
                  setIsAddOrEdit(true);
                  setIsAddOrUpdateOpen(true);
                }}
              >
                <PlusOutlined className="pr-[.5rem]" />
                {t(KEYS.ADD_DEVICE, source)}
              </Button>
            )}
          </div>
          <div className="flex flex-col h-[calc(100%-6rem)] justify-between pt-[1.125rem]">
            <Table
              loading={loading}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={data}
              className="tableHiddenScrollBar flex-1"
              scroll={{ y: 510 }}
              pagination={false}
            />
            <div className="flex justify-between items-center py-[1rem]">
              <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
                共
                <span className="text-[#2853E3] font-light">
                  {dataTotalCount}
                </span>
                條
              </div>
              <div>
                <Pagination
                  current={pageDto.PageIndex}
                  pageSize={pageDto.PageSize}
                  pageSizeOptions={[5, 10, 20]}
                  total={dataTotalCount}
                  showQuickJumper
                  showSizeChanger
                  onChange={(page, pageSize) => {
                    setPageDto({ PageIndex: page, PageSize: pageSize });
                  }}
                  className="flex flex-wrap justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 確認解綁 */}
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRMATION, source)}
          </div>
        }
        onCancle={() => setIsUnbindOpen(false)}
        onConfirm={onConfirmUnBind}
        open={isUnbindOpen}
        className={"customModal"}
        confirmLoading={confirmLoading}
      >
        <span className="pl-[2rem]">
          {t(KEYS.PLEASE_CONFIRM_WHETHER_TO_UNBIND, source)}
        </span>
      </CustomModal>

      {/* 選擇設備綁定 */}
      <CustomModal
        title={<div>{t(KEYS.DEVICE_BINDING, source)}</div>}
        onCancle={() => setIsBindingOpen(false)}
        onConfirm={onConfirmBind}
        open={isBindingOpen}
        className={"customDeviceModal"}
        modalWidth={"60rem"}
        confirmLoading={confirmLoading}
      >
        <Table
          loading={regionLoading}
          rowKey={(record) => record.areaId}
          columns={deviceColumns}
          dataSource={regionData}
          className="tableHiddenScrollBar"
          scroll={{ y: 450 }}
          pagination={false}
        />
      </CustomModal>

      {/* 添加/編輯設備 */}
      <CustomModal
        title={
          <div>
            {isAddOrEdit
              ? t(KEYS.ADD_DEVICE, source)
              : t(KEYS.EDIT_DEVICE, source)}
          </div>
        }
        onCancle={() => {
          setIsAddOrUpdateOpen(false);
          form.setFieldsValue(initialEquipmentData);
        }}
        onConfirm={() => {
          onAddOrUpdateSubmit(isAddOrEdit);
        }}
        open={isAddOrUpdateOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
        confirmLoading={confirmLoading}
        destroyOnClose={true}
      >
        {editLoding && !isAddOrEdit ? (
          <Spin spinning={editLoding} className="flex justify-center" />
        ) : (
          <Form
            colon={false}
            onFinish={() => {
              onAddOrUpdateSubmit(isAddOrEdit);
            }}
            form={form}
          >
            <FormItem
              name="equipmentCode"
              label={t(KEYS.DEVICE_ID, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 4 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <Input placeholder={t(KEYS.PLEASE_INPUT, source)} />
            </FormItem>
            <FormItem
              name="equipmentTypeId"
              label={t(KEYS.DEVICE_TYPE, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 4 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <Select
                listHeight={200}
                suffixIcon={<img src={downArrow} />}
                placeholder={t(KEYS.PLEASE_SELECT, source)}
                defaultActiveFirstOption
                options={equipmentTypesOption}
              />
            </FormItem>
            <FormItem
              name="equipmentName"
              label={t(KEYS.DEVICE_NAME, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 4 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <Input placeholder={t(KEYS.PLEASE_INPUT, source)} />
            </FormItem>

            <FormItem
              name="ipAddress"
              label={t(KEYS.DEVICE_IP_ADDRESS, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 4 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <Input placeholder={t(KEYS.PLEASE_INPUT, source)} />
            </FormItem>
            <FormItem
              name="username"
              label={t(KEYS.DEVICE_USER_NAME, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 4 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <Input placeholder={t(KEYS.PLEASE_INPUT, source)} />
            </FormItem>
            <FormItem
              name="password"
              label={t(KEYS.DEVICE_PASSWORD, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 4 : 6 }}
              wrapperCol={{ span: 15 }}
            >
              <Input
                placeholder={t(KEYS.PLEASE_INPUT, source)}
                type="password"
                autoComplete="new-password"
              />
            </FormItem>

            <FormItem
              name="brand"
              label={t(KEYS.DEVICE_BRAND_NAME, source)}
              labelCol={{ span: language === "ch" ? 4 : 6 }}
              wrapperCol={{ span: 15 }}
              style={{ marginBottom: 0 }}
            >
              <Input placeholder={t(KEYS.PLEASE_INPUT, source)} />
            </FormItem>
          </Form>
        )}
      </CustomModal>

      {/* 確認刪除 */}
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRMATION, source)}
          </div>
        }
        onCancle={() => setIsDeleteDeviceOpen(false)}
        onConfirm={onDelete}
        open={isDeleteDeviceOpen}
        className={"customModal"}
        confirmLoading={confirmLoading}
      >
        <span className="pl-[2rem]">
          {t(KEYS.PLEASE_CONFIRM_WHETHER_TO_DELETE, source)}
        </span>
      </CustomModal>
    </ConfigProvider>
  );
};
