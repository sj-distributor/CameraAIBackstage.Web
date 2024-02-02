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

import { useAction } from "./hook";
import { IEquipmentTypeList } from "@/services/dtos/equipment/type";

export const EquipmentType = () => {
  const {
    source,
    isDeleteDeviceOpen,
    setIsDeleteDeviceOpen,
    isAddOrModifyOpen,
    setIsAddOrModifyOpen,
    setIsDeleteIndex,
    data,
    t,
    setPageDto,
    loading,
    typeName,
    setTypeName,
    description,
    setDescription,
    totalListCount,
    handleAddOrUpdate,
    form,
    isAddOrUpdate,
    setIsAddOrUpdate,
    onGetEquipmentInformationById,
    isEditLoading,
    handleDelete,
    confirmLoading,
    language,
    pageDto,
  } = useAction();

  const columns: ColumnsType<IEquipmentTypeList> = [
    {
      title: t(KEYS.DEVICE_TYPE_ID, source),
      dataIndex: "id",
      width: "14.875rem",
    },
    {
      title: t(KEYS.DEVICE_TYPE, source),
      dataIndex: "name",
      width: "15.125rem",
    },
    {
      title: t(KEYS.REMARKS, source),
      dataIndex: "description",
      width: "49.4375rem",
    },
    {
      title: t(KEYS.OPERATE, source),
      dataIndex: "operate",
      width: "21.5625rem",
      render: (_, record, index) => (
        <div>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsAddOrModifyOpen(true);
              setIsAddOrUpdate(false);
              onGetEquipmentInformationById(record.id);
            }}
          >
            {t(KEYS.EDIT, source)}
          </Button>
          <Button
            type="link"
            className="w-[6rem]"
            onClick={() => {
              setIsDeleteIndex(index);
              setIsDeleteDeviceOpen(true);
            }}
          >
            {t(KEYS.DELETE, source)}
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
        <div className="bg-white h-[calc(100vh-7rem)] w-full flex-col justify-start p-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            {t(KEYS.DEVICE_TYPE, source)}
          </span>
          <div className="flex flex-row pt-[1.625rem] justify-end">
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
                共{" "}
                <span className="text-[#2853E3] font-light">
                  {totalListCount}
                </span>{" "}
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
          handleAddOrUpdate(isAddOrUpdate);
        }}
        open={isAddOrModifyOpen}
        className={"customDeviceModal"}
        modalWidth={"42.5rem"}
        confirmLoading={confirmLoading}
      >
        {isEditLoading && !isAddOrUpdate ? (
          <Spin className="flex justify-center" spinning={isEditLoading} />
        ) : (
          <Form
            colon={false}
            onFinish={() => {
              handleAddOrUpdate(isAddOrUpdate);
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
                defaultValue={typeName}
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
            >
              <TextArea
                placeholder={t(KEYS.PLEASE_ENTER_INSTRUCTION_MANUAL, source)}
                defaultValue={description}
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
          handleDelete();
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
