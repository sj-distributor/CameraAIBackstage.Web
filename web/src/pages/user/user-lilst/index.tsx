import {
  CloseOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  WarningFilled,
} from "@ant-design/icons";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {
  Button,
  ConfigProvider,
  Input,
  Pagination,
  Select,
  Switch,
  Table,
} from "antd";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-list-keys";

import { useAction } from "./hook";
import search from "../../../assets/public/search.png";
import Tree from "antd/es/tree/Tree";

export const UserList = () => {
  const {
    isAddUser,
    setIsAddUser,
    isDeleteUser,
    setIsDeleteUser,
    setIsClosed,
    isRemoveUser,
    setIsRemoveUser,
    isResetPassword,
    setIsResetPassword,
    setIsSelectList,
    rowSelection,
    expandedKeys,
    checkedKeys,
    selectedKeys,
    autoExpandParent,
    source,
    t,
    // pageDto,
    // setPageDto,
  } = useAction();

  const columns = [
    {
      title: t(KEYS.USER_ID, source),
      dataIndex: "id",
    },
    {
      title: t(KEYS.USER_NAME, source),
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
      title: t(KEYS.EMPLOYED, source),
      dataIndex: "employed",
    },
    {
      title: t(KEYS.PHONE, source),
      dataIndex: "phone",
    },
    {
      title: t(KEYS.ENTERPRISEWECHAT, source),
      dataIndex: "enterpriseWeChat",
    },
    {
      title: t(KEYS.EMAIL, source),
      dataIndex: "email",
    },
    {
      title: t(KEYS.STATES, source),
      dataIndex: "positionStates",
      render: () => {
        return (
          <Switch
            checkedChildren="啟用"
            unCheckedChildren=""
            className="h-[1.35rem]"
          />
        );
      },
    },
    {
      title: t(KEYS.OPERATE, source),
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
            <Button type="link" onClick={() => setIsResetPassword(true)}>
              {t(KEYS.RESETPASSWORD, source)}
            </Button>
          </ConfigProvider>
        );
      },
    },
    {
      title: "",
      dataIndex: "remove",
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
            <Button type="link" onClick={() => setIsRemoveUser(true)}>
              {t(KEYS.REMOVE, source)}
            </Button>
          </ConfigProvider>
        );
      },
    },
  ];

  const userData = [
    {
      key: "0",
      userId: "001",
      userName: "string",
      group: "A組",
      position: "助理",
      employed: "在職",
      phone: "13002120212",
      enterpriseWeChat: "Janny",
      email: "Janny@sjfff.com",
      states: "",
      operate: "重置密碼",
      remove: "移除",
    },
    {
      key: "002",
      userId: "002",
      userName: "Janny",
      department: "OSC",
      group: "A組",
      position: "助理",
      employed: "在職",
      phone: "13002120212",
      enterpriseWeChat: "Janny",
      email: "Janny@sjfff.com",
      states: "",
      operate: "重置密碼",
      remove: "移除",
    },
    {
      key: "003",
      userId: "003",
      userName: "Janny",
      department: "OSC",
      group: "A組",
      position: "助理",
      employed: "在職",
      phone: "13002120212",
      enterpriseWeChat: "Janny",
      email: "Janny@sjfff.com",
      states: "",
      operate: "重置密碼",
      remove: "移除",
    },
    {
      key: "004",
      userId: "004",
      userName: "Janny",
      department: "OSC",
      group: "A組",
      position: "助理",
      employed: "在職",
      phone: "13002120212",
      enterpriseWeChat: "Janny",
      email: "Janny@sjfff.com",
      states: "",
      operate: "重置密碼",
      remove: "移除",
    },
    {
      key: "005",
      userId: "005",
      userName: "Janny",
      department: "OSC",
      group: "A組",
      position: "助理",
      employed: "在職",
      phone: "13002120212",
      enterpriseWeChat: "Janny",
      email: "Janny@sjfff.com",
      states: "",
      operate: "重置密碼",
      remove: "移除",
    },
    {
      key: "006",
      userId: "006",
      userName: "Janny",
      department: "OSC",
      group: "A組",
      position: "助理",
      employed: "在職",
      phone: "13002120212",
      enterpriseWeChat: "Janny",
      email: "Janny@sjfff.com",
      states: "",
      operate: "重置密碼",
      remove: "移除",
    },
  ];

  return (
    <div className="bg-white w-full pr-[1rem] pl-[1.6rem] h-screen">
      <div className="bg-white w-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          {t(KEYS.USER_LIST, source)}
        </span>
        <br />
        <div className="flex flex-row justify-between">
          <div>
            <Input
              className="w-[17.5rem]"
              suffix={<img src={search} />}
              placeholder={t(KEYS.SEARCH_USERNAME_DEPARTMENT, source)}
            />
            <Select
              className="mx-[1rem] w-[13.5rem] mt-[1.7rem]"
              placeholder={t(KEYS.STATES, source)}
              options={[
                {
                  value: t(KEYS.ENABLE, source),
                  label: t(KEYS.ENABLE, source),
                },
                {
                  value: t(KEYS.NOT_ENABLED, source),
                  label: t(KEYS.NOT_ENABLED, source),
                },
              ]}
            />
          </div>
          <div className="pb-[1.2rem]">
            <Button
              type="default"
              className="h-[2.5rem] w-[7.25rem] mr-[1rem] mt-[1.5rem]"
              onClick={() => setIsDeleteUser(true)}
            >
              {t(KEYS.REMOVE_USERS_IN_BULK, source)}
            </Button>
            <Button
              type="primary"
              className="h-[2.5rem] w-[7.25rem]"
              onClick={() => setIsAddUser(true)}
            >
              <PlusOutlined /> {t(KEYS.ADD_USER, source)}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <Table
          rowKey={(record) => record.deviceId}
          columns={columns}
          dataSource={userData}
          rowSelection={rowSelection}
          pagination={false}
        />
        <div className="flex justify-between items-center py-[1rem]">
          <div className="text-[#929292] text-[0.785rem]">
            共{" "}
            <span className="text-[#2853E3] font-light">{userData.length}</span>
            條
          </div>
          <div>
            <Pagination
              current={1}
              total={50}
              pageSize={10}
              pageSizeOptions={[6, 10, 20]}
              showSizeChanger
              showQuickJumper
              onChange={(page, pageSize) => {
                // setPageDto({ PageIndex: page, PageSize: pageSize });
              }}
            />
          </div>
        </div>
      </div>
      <CustomModal
        modalWidth={"36rem"}
        title={
          <div className="flex flex-row justify-between">
            <div>{t(KEYS.ADD_USER, source)}</div>
            <CloseOutlined onClick={() => setIsClosed(true)} />
          </div>
        }
        onCancle={() => setIsAddUser(false)}
        onConfirm={() => setIsAddUser(false)}
        open={isAddUser}
        className={"customDeviceModal"}
      >
        <div className="flex flex-nowrap">
          <div className="border-solid border border-gray-200 w-[16rem] rounded">
            <div className="mb-[0.5rem] ml-[1rem] mt-[0.5rem] text-[0.8rem] text-slate-600">
              {t(KEYS.TITLE, source)}
            </div>
            <Input
              className="ml-[0.5rem] mb-[0.5rem] w-[14rem] h-[1.65rem] text-[0.8rem] rounded"
              suffix={<img src={search} className="size-[1rem]" />}
              placeholder={t(KEYS.SEARCH_USERNAME_DEPARTMENT, source)}
            />
            <Tree
              checkable
              treeData={userData}
              autoExpandParent={autoExpandParent}
              checkedKeys={checkedKeys}
              selectedKeys={selectedKeys}
              expandedKeys={expandedKeys}
            />
          </div>
          <div className="mt-[6rem]">
            <div
              onClick={() => setIsSelectList(true)}
              className="border-solid border border-gray-200 w-[1rem] h-[1rem] m-[0.5rem] flex justify-items-center"
            >
              <RightOutlined className="text-[0.7rem] ml-[0.15rem]" />
            </div>
            <div
              onChange={() => setIsSelectList(true)}
              className="border-solid border border-gray-200 w-[1rem] h-[1rem] m-[0.5rem] flex justify-items-center"
            >
              <LeftOutlined className="text-[0.7rem] ml-[0.15rem]" />
            </div>
          </div>
          <div className="border-solid border border-gray-200 w-[16rem] rounded">
            <div className="mb-[0.5rem] ml-[1rem] mt-[0.5rem] text-[0.8rem]">
              {t(KEYS.SELECTED, source)}
              <span>{userData.length}</span>
              {t(KEYS.USERS, source)}
            </div>
            <Input
              className="ml-[0.5rem] mb-[0.5rem] w-[14rem] h-[1.65rem] text-[0.8rem] rounded"
              suffix={<img src={search} className="size-[1rem]" />}
              placeholder={t(KEYS.SEARCH_USERNAME_DEPARTMENT, source)}
            />
            <div className="ml-[1rem] mb-[0.5rem] scroll-auto h-[11rem] flex justify-between" />
          </div>
        </div>
      </CustomModal>
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRMATION, source)}
          </div>
        }
        onCancle={() => setIsDeleteUser(false)}
        onConfirm={() => setIsDeleteUser(false)}
        open={isDeleteUser}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {t(KEYS.PLEASE_CONFIRM_WHETHER_TO_DELETE_IN_BATCHES, source)}
        </span>
      </CustomModal>
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRMATION, source)}
          </div>
        }
        onCancle={() => setIsRemoveUser(false)}
        onConfirm={() => setIsRemoveUser(false)}
        open={isRemoveUser}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {t(KEYS.PLEASE_CONFIRM_WHETHER_TO_DELETE_IN_BATCHES, source)}
        </span>
      </CustomModal>
      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>{t(KEYS.UPDATE_PASSWORD, source)}</div>
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
          <div className="flex justify-start items-center mb-[1rem]">
            <span className="text-[0.8rem]">
              {t(KEYS.CURRENT_PASSWORD, source)}
            </span>
            <Input
              placeholder={t(KEYS.PLEASE_ENTER, source)}
              className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
            />
          </div>
          <div className="flex justify-start items-center mb-[1rem]">
            <span className="text-[0.8rem] pl-[0.78rem]">
              {t(KEYS.NEW_PASSWORD, source)}
            </span>
            <Select
              className="h-[1.7rem] w-[23rem] ml-[0.5rem] userListSelect"
              mode="tags"
              placeholder={t(KEYS.PLEASE_SELECT, source)}
              suffixIcon={
                <DownOutlined className="text-gray-600 text-[0.7rem]" />
              }
              defaultActiveFirstOption
            />
          </div>
          <div>
            <span className="text-[0.8rem]">
              {t(KEYS.CONFIRM_PASSWORD, source)}
            </span>
            <Input
              placeholder={t(KEYS.PLEASE_ENTER, source)}
              className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
