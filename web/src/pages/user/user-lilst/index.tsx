import {
  CloseOutlined,
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
              移除
            </Button>
          </ConfigProvider>
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

  return (
    <div className="bg-white w-full pr-[1rem] pl-[1.6rem] h-[calc(100vh-7rem)]">
      <div className="bg-whitew-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
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
            />
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
        modalWidth={"36rem"}
        title={
          <div className="flex flex-row justify-between">
            <div>添加用戶</div>
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
              標題
            </div>
            <Input
              className="ml-[0.5rem] mb-[0.5rem] w-[14rem] h-[1.65rem] text-[0.8rem] rounded"
              suffix={<img src={search} className="size-[1rem]" />}
              placeholder="搜索用戶名，部門"
            />
            <Tree
              checkable
              treeData={data}
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
              已選
              <span>{data.length}</span>
              個用戶
            </div>
            <Input
              className="ml-[0.5rem] mb-[0.5rem] w-[14rem] h-[1.65rem] text-[0.8rem] rounded"
              suffix={<img src={search} className="size-[1rem]" />}
              placeholder="搜索用戶名，部門"
            />
            <div className="ml-[1rem] mb-[0.5rem] scroll-auto h-[11rem] flex justify-between" />
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
