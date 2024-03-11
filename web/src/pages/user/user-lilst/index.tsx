import { CloseOutlined, WarningFilled } from "@ant-design/icons";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {
  Button,
  Checkbox,
  Input,
  Pagination,
  Select,
  Switch,
  Table,
} from "antd";

import { CustomModal } from "@/components/custom-modal";

import { useAction } from "./hook";
import Search from "antd/es/input/Search";

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
    isSelectList,
    setIsSelectList,
  } = useAction();

  const columns = [
    {
      title: "用戶ID",
      dataIndex: "userId",
    },
    {
      title: "用戶名",
      dataIndex: "userName",
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
      dataIndex: "employed",
    },
    {
      title: "電話",
      dataIndex: "phone",
    },
    {
      title: "企業微信",
      dataIndex: "enterpriseWeChat",
    },
    {
      title: "關聯郵箱",
      dataIndex: "email",
    },
    {
      title: "狀態",
      dataIndex: "states",
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
      title: "操作",
      dataIndex: "operate",
      render: () => {
        return (
          <Button
            type="link"
            className="w-[3.6rem] text-[0.8rem]"
            onClick={() => setIsResetPassword(true)}
          >
            重置密碼
          </Button>
        );
      },
    },
    {
      title: "",
      dataIndex: "remove",
      render: () => {
        return (
          <Button
            type="link"
            className="text-[0.8rem]"
            onClick={() => setIsRemoveUser(true)}
          >
            移除
          </Button>
        );
      },
    },
  ];

  const data = [
    {
      key: "001",
      userId: "001",
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

  const rowSelection = {
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",

      name: record.name,
    }),
  };

  return (
    <div className="bg-white w-full pr-[1rem] pl-[1.6rem] h-[calc(100vh-7rem)]">
      <div className="bg-whitew-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          用戶列表
        </span>
        <br />
        <div className="flex flex-row justify-between">
          <div>
            <Input className="w-[17.5rem]" placeholder="搜索用戶名，部門" />
            <Select
              className="mx-[1rem] w-[13.5rem] mt-[1.7rem]"
              placeholder="狀態"
              options={[
                { value: "啟用", label: "啟用" },
                { value: "非啟用", label: "非啟用" },
              ]}
            />
          </div>
          <div className="pb-[1.2rem]">
            <Button
              type="default"
              className="h-[2.5rem] w-[7.25rem] mr-[1rem] mt-[1.5rem]"
              onClick={() => setIsDeleteUser(true)}
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
      <div className="flex flex-col justify-between">
        <Table
          rowKey={(record) => record.deviceId}
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          pagination={false}
        />
        <div className="flex justify-between items-center py-[1rem]">
          <div className="text-[#929292] text-[0.785rem]">
            共 <span className="text-[#2853E3] font-light">{data.length}</span>
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
            />
          </div>
        </div>
      </div>
      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>添加用戶</div>
            <CloseOutlined onClick={() => setIsClosed} />
          </div>
        }
        onCancle={() => setIsAddUser(false)}
        onConfirm={() => setIsAddUser(false)}
        open={isAddUser}
        className={"customDeviceModal"}
      >
        <div className="flex justify-between">
          <div className="border-solid border border-gray-400 w-[16rem] rounded">
            <div className="mb-[0.5rem] ml-[0.5rem] mt-[0.5rem]">標題</div>
            <Search
              placeholder="搜索用戶名，部門"
              style={{
                width: 230,
              }}
              className="mb-[0.5rem] ml-[0.5rem]"
            />
            <div className="ml-[1rem] mb-[0.5rem] scroll-auto h-[11rem]">
              {data.map((data) => (
                <div>
                  <Checkbox
                    className="mb-[0.5rem]"
                    onClick={() => setIsSelectList(true)}
                  >
                    {data.userName}
                  </Checkbox>
                  <br />
                </div>
              ))}
            </div>
          </div>
          <div className="border-solid border border-gray-400 w-[16rem] rounded">
            <div className="mb-[0.5rem] ml-[0.5rem] mt-[0.5rem]">
              已选
              <span>{data.length}</span>
              個用戶
            </div>
            <Search
              placeholder="搜索用戶名，部門"
              style={{
                width: 240,
              }}
              className="mb-[0.5rem] ml-[0.5rem]"
            />
            <div className="ml-[1rem] mb-[0.5rem] scroll-auto h-[11rem] flex justify-between">
              <div onChange={() => setIsSelectList(true)}>
                <CloseOutlined onClick={() => setIsClosed} />
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            操作確認
          </div>
        }
        onCancle={() => setIsDeleteUser(false)}
        onConfirm={() => setIsDeleteUser(false)}
        open={isDeleteUser}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否批量删除？</span>
      </CustomModal>
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            操作確認
          </div>
        }
        onCancle={() => setIsRemoveUser(false)}
        onConfirm={() => setIsRemoveUser(false)}
        open={isRemoveUser}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否批量删除？</span>
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
