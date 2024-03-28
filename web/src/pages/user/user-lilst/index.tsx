import { CloseOutlined, WarningFilled } from "@ant-design/icons";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {
  Button,
  ConfigProvider,
  Input,
  Pagination,
  Select,
  Switch,
  Table,
  TableProps,
} from "antd";
import { Trans } from "react-i18next";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-list-keys";
import { IUserDataItem, UserStatus } from "@/services/dtos/user";

import search from "../../../assets/public/search.png";
import { TransferTree } from "../user-permissions/tranfer-tree";
import { BackGroundRolePermissionEnum } from "../user-permissions/user-newpermissions/props";
import { useAction } from "./hook";

export const UserList = () => {
  const {
    isAddUser,
    setIsAddUser,
    handelGetSelectedUsers,
    setIsClosed,
    isRemoveUser,
    setIsRemoveUser,
    isResetPassword,
    setIsResetPassword,
    getUserListRequest,
    setGetUserListRequest,
    isGetUserListLoading,
    userListData,
    keyword,
    setKeyword,
    isDeleteUsers,
    setIsDeleteUsers,
    handelConfirmDeleteUsers,
    setDeleteUserKeys,
    isDeleteUserLoading,
    handelUpdateUserData,
    isUpdateUserLoading,
    t,
    source,
    updateUserId,
    setUpdateUserId,
    myPermissions,
    language,
  } = useAction();

  const columns: TableProps<IUserDataItem>["columns"] = [
    {
      title: t(KEYS.USER_ID, source),
      dataIndex: "id",
    },
    {
      title: t(KEYS.NAME, source),
      dataIndex: "name",
    },
    {
      title: t(KEYS.DEPARTMENT, source),
      dataIndex: "department",
    },
    {
      title: t(KEYS.GROUP, source),
      dataIndex: "group",
    },
    {
      title: t(KEYS.POSITION, source),
      dataIndex: "position",
    },
    {
      title: t(KEYS.POSITION_STATUS, source),
      dataIndex: "positionStatus",
    },
    {
      title: t(KEYS.PHONE, source),
      dataIndex: "phone",
    },
    {
      title: t(KEYS.WECHAT_NAME, source),
      dataIndex: "wechatName",
    },
    {
      title: t(KEYS.EMAIL, source),
      dataIndex: "email",
    },
    {
      title: t(KEYS.IS_QUALIFIED, source),
      dataIndex: "isQualified",
      render: (isQualified, record) => {
        return (
          <Switch
            checkedChildren={t(KEYS.ENABLE, source)}
            unCheckedChildren=""
            loading={String(record.id) === updateUserId && isUpdateUserLoading}
            value={isQualified}
            className={`${
              language === "ch" ? "w-[3.125rem]" : "w-[4rem]"
            } text-[.625rem] customSwitch`}
            onChange={(isQualified) => {
              setUpdateUserId(String(record.id));
              handelUpdateUserData({ ...record, isQualified });
            }}
          />
        );
      },
    },
    // {
    //   title: t(KEYS.OPERATE, source),
    //   dataIndex: "operate",
    //   render: () => {
    //     return (
    //       <ConfigProvider
    //         theme={{
    //           components: {
    //             Button: {
    //               colorLink: "#2853E3",
    //               colorLinkHover: "#5168e3",
    //               colorPrimary: "#2853E3",
    //               colorPrimaryHover: "#5168e3",
    //               defaultBorderColor: "#2853E3",
    //               defaultColor: "#2853E3",
    //               linkHoverBg: "#F0F4FF",
    //             },
    //           },
    //         }}
    //       >
    //         <Button
    //           type="link"
    //           disabled
    //           onClick={() => setIsResetPassword(true)}
    //         >
    //           {t(KEYS.RESET_PASSWORD, source)}
    //         </Button>
    //       </ConfigProvider>
    //     );
    //   },
    // },
    {
      title: t(KEYS.OPERATE, source),
      dataIndex: "operate",
      render: (_, record) => {
        return (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorLink: "#2853E3",
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
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanDeleteCameraAiUserAccount
            ) && (
              <Button
                type="link"
                onClick={() => {
                  setIsDeleteUsers(false);
                  setDeleteUserKeys([String(record.id)]);
                  setIsRemoveUser(true);
                }}
              >
                {t(KEYS.REMOVE, source)}
              </Button>
            )}
          </ConfigProvider>
        );
      },
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white px-4 flex-1">
      <div className="bg-whitew-full flex-col justify-start pt-[1rem] overflow-scroll no-scrollbar">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          {t(KEYS.USER_LIST, source)}
        </span>
        <br />
        <div className="flex flex-row justify-between">
          <div className="mb-[1rem]">
            <Input
              className="w-[17.5rem]"
              suffix={<img src={search} />}
              placeholder={t(KEYS.SEARCH_PLACEHOLDER)}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Select
              className="mx-[1rem] w-[13.5rem] mt-[1.7rem]"
              placeholder={t(KEYS.STATUS)}
              options={[
                { value: UserStatus.Enable, label: t(KEYS.ENABLE, source) },
                {
                  value: UserStatus.Disable,
                  label: t(KEYS.NOT_ENABLE, source),
                },
              ]}
              onChange={(status) =>
                setGetUserListRequest((prev) => ({ ...prev, Status: status }))
              }
            />
          </div>
          <div className="flex self-center">
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanBatchDeleteCameraAiUserAccount
            ) && (
              <Button
                type="default"
                className="h-[2.5rem] mr-[1rem]"
                onClick={() => {
                  setIsDeleteUsers(true);
                  setIsRemoveUser(true);
                }}
              >
                {t(KEYS.BATCH_REMOVE_USERS, source)}
              </Button>
            )}
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanAddCameraAiUserAccount
            ) && (
              <Button
                type="primary"
                className="h-[2.5rem] w-[7.25rem]"
                onClick={() => setIsAddUser(true)}
              >
                <PlusOutlined /> {t(KEYS.ADD_USERS, source)}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 overflow-y-auto no-scrollbar">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={userListData.userProfiles}
          pagination={false}
          sticky
          scroll={{ x: 1160 }}
          loading={isGetUserListLoading}
          rowSelection={{
            type: "checkbox",
            onChange(selectedRowKeys) {
              setDeleteUserKeys((prev) =>
                selectedRowKeys.map((item) => String(item))
              );
            },
          }}
        />
      </div>
      <div className="flex justify-between items-center py-[1rem]">
        <div className="text-[#929292] text-[0.785rem]">
          <Trans
            i18nKey={KEYS.PAGINATION}
            ns="userList"
            values={{ count: userListData.count }}
            components={{
              span: <span className="text-[#2853E3] font-light mx-1" />,
            }}
          />
        </div>
        <div>
          <Pagination
            current={getUserListRequest.PageIndex}
            total={userListData.count}
            pageSize={getUserListRequest.PageSize}
            pageSizeOptions={[10, 20, 50]}
            onChange={(page, pageSize) =>
              setGetUserListRequest((prev) => ({
                PageIndex: page,
                PageSize: pageSize,
              }))
            }
            showSizeChanger
            showQuickJumper
          />
        </div>
      </div>

      <TransferTree
        isModelOpen={isAddUser}
        setIsModelOpen={setIsAddUser}
        handelGetSelectedUsers={handelGetSelectedUsers}
      />

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRM)}
          </div>
        }
        onCancle={() => setIsRemoveUser(false)}
        onConfirm={() => handelConfirmDeleteUsers()}
        open={isRemoveUser}
        confirmLoading={isDeleteUserLoading}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {t(
            isDeleteUsers ? KEYS.DELETE_USERS_PROMPT : KEYS.DELETE_USER_PROMPT,
            source
          )}
        </span>
      </CustomModal>

      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>{t(KEYS.EDIT_PASSWORD, source)}</div>
            <CloseOutlined onClick={() => setIsClosed(true)} />
          </div>
        }
        onCancle={() => setIsResetPassword(false)}
        onConfirm={() => setIsResetPassword(false)}
        open={isResetPassword}
        modalWidth={"38rem"}
        className={"customDeviceModal h-[13.1rem]"}
      >
        <div>
          <div className="flex flex-col-reverse">
            <div className="flex justify-start items-center mb-[1rem]">
              <span className="text-[0.8rem]">
                {t(KEYS.CURRENT_PASSWORD, source)}
              </span>
              <Input
                placeholder={t(KEYS.PLEASE_ENTRE)}
                className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
              />
            </div>
          </div>
          <div className="flex justify-start mb-[1rem] ml-[1rem] items-center">
            <span className="text-[0.8rem]">
              {t(KEYS.NEW_PASSWORD, source)}
            </span>
            <Input
              placeholder={t(KEYS.PLEASE_ENTRE)}
              className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
            />
          </div>
          <div className="flex justify-start items-center">
            <span className="text-[0.8rem]">
              {t(KEYS.CONFIRM_PASSWORD, source)}
            </span>
            <Input
              placeholder={t(KEYS.PLEASE_ENTRE)}
              className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
