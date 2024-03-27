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

import { CustomModal } from "@/components/custom-modal";
import { IUserDataItem, UserStatus } from "@/services/dtos/user";

import search from "../../../assets/public/search.png";
import { TransferTree } from "../user-permissions/tranfer-tree";
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
  } = useAction();

  console.log(isDeleteUsers);

  const columns: TableProps<IUserDataItem>["columns"] = [
    {
      title: "用戶ID",
      dataIndex: "id",
    },
    {
      title: "用戶名",
      dataIndex: "name",
    },
    {
      title: "部門",
      dataIndex: "department",
    },
    {
      title: "組別",
      dataIndex: "group",
    },
    {
      title: "崗位",
      dataIndex: "position",
    },
    {
      title: "是否在職",
      dataIndex: "positionStatus",
    },
    {
      title: "電話",
      dataIndex: "phone",
    },
    {
      title: "企業微信",
      dataIndex: "wechatName",
    },
    {
      title: "關聯郵箱",
      dataIndex: "email",
    },
    {
      title: "狀態",
      dataIndex: "isQualified",
      render: (isQualified, record) => {
        return (
          <Switch
            checkedChildren="啟用"
            unCheckedChildren=""
            loading={isUpdateUserLoading}
            value={isQualified}
            className="h-[1.35rem]"
            onChange={(isQualified) => {
              handelUpdateUserData({ ...record, isQualified });
            }}
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: () => {
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
            <Button
              type="link"
              disabled
              // className="w-[4.5rem] text-[0.8rem]"
              onClick={() => setIsResetPassword(true)}
            >
              重置密碼
            </Button>
          </ConfigProvider>
        );
      },
    },
    {
      title: "",
      dataIndex: "remove",
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
            <Button
              type="link"
              onClick={() => {
                setIsDeleteUsers(false);
                setDeleteUserKeys([String(record.id)]);
                setIsRemoveUser(true);
              }}
            >
              移除
            </Button>
          </ConfigProvider>
        );
      },
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white px-4">
      <div className="bg-whitew-full flex-col justify-start pt-[1rem] overflow-scroll no-scrollbar">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          用戶列表
        </span>
        <br />
        <div className="flex flex-row justify-between">
          <div>
            <Input
              className="w-[17.5rem]"
              suffix={<img src={search} />}
              placeholder="搜索用戶名，部門"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Select
              className="mx-[1rem] w-[13.5rem] mt-[1.7rem]"
              placeholder="狀態"
              options={[
                { value: UserStatus.Enable, label: "啟用" },
                { value: UserStatus.Disable, label: "非啟用" },
              ]}
              onChange={(status) =>
                setGetUserListRequest((prev) => ({ ...prev, Status: status }))
              }
            />
          </div>
          <div className="pb-[1.2rem]">
            <Button
              type="default"
              className="h-[2.5rem] w-[7.25rem] mr-[1rem] mt-[1.5rem]"
              onClick={() => {
                setIsDeleteUsers(true);
                setIsRemoveUser(true);
              }}
            >
              批量移除用戶
            </Button>
            <Button
              type="primary"
              className="h-[2.5rem] w-[7.25rem]"
              onClick={() => setIsAddUser(true)}
            >
              <PlusOutlined /> 添加用戶
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={userListData.userProfiles}
          pagination={false}
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
        <div className="flex justify-between items-center py-[1rem]">
          <div className="text-[#929292] text-[0.785rem]">
            共{" "}
            <span className="text-[#2853E3] font-light">
              {userListData.count}
            </span>
            條
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
            操作確認
          </div>
        }
        onCancle={() => setIsRemoveUser(false)}
        onConfirm={() => handelConfirmDeleteUsers()}
        open={isRemoveUser}
        confirmLoading={isDeleteUserLoading}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {isDeleteUsers
            ? "請確認是否批量移除已選中的用戶？"
            : "確認確認是否移除該用戶？"}
        </span>
      </CustomModal>

      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>修改密码</div>
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
              <span className="text-[0.8rem]">當前密碼</span>
              <Input
                placeholder="請輸入"
                className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
              />
            </div>
          </div>
          <div className="flex justify-start mb-[1rem] ml-[1rem] items-center">
            <span className="text-[0.8rem]">新密碼</span>
            <Select
              className="h-[1.7rem] w-[23rem] ml-[0.5rem]"
              mode="tags"
              placeholder="請選擇"
              defaultActiveFirstOption
            />
          </div>
          <div className="flex justify-start items-center">
            <span className="text-[0.8rem]">確認密碼</span>
            <Input
              placeholder="請輸入"
              className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
