import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Pagination, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CustomModal } from "@/components/custom-modal";
import search from "../../../../assets/public/search.png";

export const UserPermissions = () => {
  const [isDeletePermissions, setISDeletePermissions] =
    useState<boolean>(false);

  const [isAddNewRole, setIsAddNewRole] = useState<boolean>(false);

  const navigate = useNavigate();

  const rowSelection = {
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",
    }),
  };

  const columns = [
    {
      title: "角色名稱",
      dataIndex: "characterName",
      className: "w-[16rem]",
    },
    {
      title: "角色描述",
      dataIndex: "roleDescription",
      className: "w-[62rem]",
    },
    {
      title: "操作",
      dataIndex: "operate",
      className: "flex flex-items-center",
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
            <div className="flex justify-center items-center">
              <Button
                type="link"
                className="text-[0.8rem] text-blue-600 h-[1.5rem] w-[5rem]"
                onClick={() => navigate("/user/permissions/distribute")}
              >
                分配
              </Button>
              <Button
                type="link"
                className="text-[0.8rem] text-blue-600 h-[1.5rem] w-[5rem] ml-[0.5rem]"
                onClick={() => navigate("/user/permissions/newOrUpdate")}
              >
                編輯
              </Button>
              <Button
                type="link"
                className="text-[0.8rem] text-blue-600 h-[1.5rem] w-[5rem] ml-[0.5rem] rounded-none"
                onClick={() => setISDeletePermissions(true)}
              >
                刪除
              </Button>
            </div>
          </ConfigProvider>
        );
      },
    },
  ];

  const data = [
    {
      key: "001",
      characterName: "超級管理員",
      roleDescription: "系統最高權限角色，擁有全部權限，不能刪除",
      operate: "分配",
    },
    {
      key: "002",
      characterName: "管理員",
      roleDescription: "管理員角色",
      operate: "分配",
      edit: "編輯",
      delete: "刪除",
    },
    {
      key: "003",
      characterName: "普通員工1",
      roleDescription: "系統默認角色",
      operate: "分配",
      edit: "編輯",
      delete: "刪除",
    },
    {
      key: "004",
      characterName: "普通員工2",
      roleDescription: "自定義角色1",
      operate: "分配",
      edit: "編輯",
      delete: "刪除",
    },
    {
      key: "005",
      characterName: "倉務主管",
      roleDescription: "自定義角色2",
      operate: "分配",
      edit: "編輯",
      delete: "刪除",
    },
    {
      key: "006",
      characterName: "採購主管",
      roleDescription: "自定義角色3",
      operate: "分配",
      edit: "編輯",
      delete: "刪除",
    },
  ];

  return (
    <div>
      <div className="bg-white w-full pr-[1rem] pl-[1.6rem] h-[calc(100vh-7rem)]">
        <div className="bg-whitew-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1rem] font-semibold tracking-tight">
            角色列表
          </span>
          <br />
          <div className="flex flex-row justify-between mt-[1rem] mb-[0.5rem]">
            <div>
              <Input
                className="w-[17.5rem]"
                placeholder="搜索角色名稱"
                suffix={<img src={search} />}
              />
            </div>
            <Button
              type="primary"
              className="h-[2.75rem] w-[7.25rem]"
              onClick={() => navigate("/user/permissions/newOrUpdate")}
            >
              <PlusOutlined />
              新增角色
            </Button>
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
              共 <span className="text-[#2853E3] font-light">200</span>條
            </div>
            <div>
              <Pagination
                current={1}
                total={200}
                pageSize={10}
                pageSizeOptions={[6, 10, 20]}
                showSizeChanger
                showQuickJumper
              />
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        title={
          <div className="flex flex-row justify-content">
            <div className="text-gray-300 mr-[0.5rem]">角色列表 /</div>
            <span>新增角色</span>
          </div>
        }
        onCancle={() => setIsAddNewRole(false)}
        onConfirm={() => setIsAddNewRole(false)}
        open={isAddNewRole}
        className={"customDeviceModal"}
        modalWidth="105.375rem"
      >
        <div>
          <div>角色信息</div>
          <div className="w-[71.25rem] rounded h-[14rem]">
            <div className="flex justify-start w-[71.25rem] rounded">
              <span>角色名稱</span>
              <Input placeholder="請輸入" className="h-[2rem] rounded" />
            </div>
            <div className="flex justify-start">
              <span>角色描述</span>
              <TextArea placeholder="請輸入" />
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
        onCancle={() => setISDeletePermissions(false)}
        onConfirm={() => setISDeletePermissions(false)}
        open={isDeletePermissions}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否刪除角色？</span>
      </CustomModal>
    </div>
  );
};
