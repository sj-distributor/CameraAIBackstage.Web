import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Spin,
  Table,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { ColumnsType } from "antd/es/table";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/equipment-type-keys";
import { BackGroundRolePermissionEnum } from "@/pages/user/user-permissions/user-newpermissions/props";
import { IEquipmentTypeList } from "@/services/dtos/equipment/type";

import { useAction } from "./hook";

export const EquipmentType = () => {
  const {
    source,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isAddOrModifyOpen,
    setIsAddOrModifyOpen,
    data,
    t,
    setPageDto,
    loading,
    typeName,
    setTypeName,
    description,
    setDescription,
    totalListCount,
    onAddOrUpdateSubmit,
    form,
    isAddOrUpdate,
    setIsAddOrUpdate,
    onGetEquipmentTypeInfoById,
    isEditLoading,
    onDelete,
    confirmLoading,
    language,
    pageDto,
    setIsDeleteId,
    myPermissions,
  } = useAction();

  const columns: ColumnsType<IEquipmentTypeList> = [
    {
      title: t(KEYS.DEVICE_TYPE_ID, source),
      dataIndex: "id",
      width: "15%",
    },
    {
      title: t(KEYS.DEVICE_TYPE, source),
      dataIndex: "name",
      width: "15%",
    },
    {
      title: t(KEYS.REMARKS, source),
      dataIndex: "description",
      width: "50%",
    },
    {
      title: t(KEYS.OPERATE, source),
      dataIndex: "operate",
      width: "20%",
      render: (_, record, index) => (
        <div>
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanUpdateCameraAiEquipmentType
          ) && (
            <Button
              type="link"
              className="w-[6rem]"
              onClick={() => {
                setIsAddOrModifyOpen(true);
                setIsAddOrUpdate(false);
                onGetEquipmentTypeInfoById(record.id);
              }}
            >
              {t(KEYS.EDIT, source)}
            </Button>
          )}
          {myPermissions.includes(
            BackGroundRolePermissionEnum.CanDeleteCameraAiEquipmentType
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
        <div className="bg-white h-[calc(100vh-7rem)] w-full flex-col justify-start p-[1.5rem]">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            {t(KEYS.DEVICE_TYPE, source)}
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-end">
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanAddCameraAiEquipmentType
            ) ? (
              <Button
                type="primary"
                className="h-[2.75rem]"
                onClick={() => {
                  setIsAddOrModifyOpen(true);
                  setIsAddOrUpdate(true);
                }}
              >
                <PlusOutlined className="pr-[.5rem]" />
                {t(KEYS.ADD_TYPE, source)}
              </Button>
            ) : (
              <div className="h-[2.75rem]" />
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
                  {totalListCount}
                </span>
                條
              </div>
              <div>
                <Pagination
                  current={pageDto.PageIndex}
                  pageSize={pageDto.PageSize}
                  pageSizeOptions={[5, 10, 20]}
                  total={totalListCount}
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

      {/* 添加/編輯類型 */}
      <CustomModal
        title={
          <div>
            {isAddOrUpdate
              ? t(KEYS.ADD_TYPE, source)
              : t(KEYS.MODIFICATION_TYPE, source)}
          </div>
        }
        onCancle={() => {
          setIsAddOrModifyOpen(false);
          form.setFieldsValue({
            typeName: "",
            description: "",
          });
          setTypeName("");
          setDescription("");
        }}
        onConfirm={() => {
          onAddOrUpdateSubmit(isAddOrUpdate);
        }}
        open={isAddOrModifyOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
        confirmLoading={confirmLoading}
        destroyOnClose={true}
      >
        {isEditLoading && !isAddOrUpdate ? (
          <Spin className="flex justify-center" spinning={isEditLoading} />
        ) : (
          <Form
            colon={false}
            onFinish={() => {
              onAddOrUpdateSubmit(isAddOrUpdate);
            }}
            form={form}
          >
            <FormItem
              name="typeName"
              label={t(KEYS.DEVICE_TYPE, source)}
              rules={[{ required: true }]}
              labelCol={{ span: language === "ch" ? 4 : 5 }}
              wrapperCol={{ span: 20 }}
              initialValue={typeName}
            >
              <Input
                placeholder={t(KEYS.PLEASE_ENTER_DEVICE_TYPE, source)}
                value={typeName}
                onChange={(e) => {
                  setTypeName(e.target.value);
                }}
              />
            </FormItem>
            <FormItem
              name="description"
              label={t(KEYS.INSTRUCTION_MANUAL, source)}
              labelCol={{ span: language === "ch" ? 4 : 5 }}
              wrapperCol={{ span: 20 }}
              style={{ marginBottom: 0 }}
              initialValue={description}
            >
              <TextArea
                placeholder={t(KEYS.PLEASE_ENTER_INSTRUCTION_MANUAL, source)}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
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
        onConfirm={() => {
          setIsDeleteDeviceOpen(false);
          onDelete();
        }}
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
