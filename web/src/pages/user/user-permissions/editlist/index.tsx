import { CloseOutlined, PlusOutlined, WarningFilled } from "@ant-design/icons";
import { Button, Input, Pagination, Table, Transfer } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CustomModal } from "@/components/custom-modal";

export const UserEditList = () => {
  const [deletePermissions, setDeletePermissions] = useState<boolean>(false);

  const [batchDeleteUser, setBatchDeleteUser] = useState<boolean>(false);

  const [isAddNewRole, setIsAddNewRole] = useState<boolean>(false);

  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

  const navigate = useNavigate();

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",
    }),
  };

  const columns = [
    {
      title: "用户名",
      dataIndex: "userName",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: () => {
        return (
          <div>
            <Button
              type="text"
              className="text-[0.8rem] text-blue-400 h-[1.5rem] w-[5rem] ml-[0.5rem] rounded-none"
              onClick={() => setDeletePermissions(true)}
            >
              移除
            </Button>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      key: "001",
      userName: "Janny",
      updateTime: "2021-12-12 12:00",
    },
    {
      key: "002",
      userName: "Tom",
      updateTime: "2021-12-12 12:00",
    },
    {
      key: "003",
      userName: "Tonny",
      updateTime: "2021-12-12 12:00",
    },
    {
      key: "004",
      userName: "Bonni",
      updateTime: "2021-12-12 12:00",
    },
    {
      key: "005",
      userName: "Bonni",
      updateTime: "2021-12-12 12:00",
    },
    {
      key: "006",
      userName: "Rex",
      updateTime: "2021-12-12 12:00",
    },
  ];

  return (
    <div>
      <div className="bg-white w-full pr-[1rem] pl-[1.6rem] h-[calc(100vh-7rem)] ">
        <div className="bg-whitew-full flex-col justify-start pt-[1.5rem] overflow-scroll  no-scrollbar">
          <Button type="text">
            <span className="text-[1rem] tracking-tight ">角色列表</span>
          </Button>
          <span className="text-[1rem]">/</span>
          <Button type="text">
            <span className="text-[1rem] font-semibold">角色列表</span>
          </Button>

          <br />
          <div className="flex flex-row  justify-between mt-[1rem] mb-[0.5rem]">
            <div>
              <Input className="w-[17.5rem]" placeholder="搜索角色名稱" />
            </div>
            <div>
              <Button
                className="h-[2.75rem] w-[7.25rem] mr-[1rem]"
                onClick={() => setBatchDeleteUser(true)}
              >
                批量删除用户
              </Button>
              <Button
                type="primary"
                className="h-[2.75rem] w-[7.25rem]"
                onClick={() => navigate("/user/permissions/newpermissions")}
              >
                <PlusOutlined />
                添加用户
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col  justify-between ">
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

      <div>
        <CustomModal
          title={
            <div className="flex flex-row justify-content ">
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
            <div>
              <div>角色信息</div>
              <div className="w-[71.25rem] rounded h-[14rem]">
                <div className="flex justify-start w-[71.25rem] rounded ">
                  <span>角色名稱</span>
                  <Input placeholder="請輸入" className="h-[2rem] rounded" />
                </div>
                <div className="flex justify-start">
                  <span>角色描述</span>
                  <TextArea placeholder="請輸入" />
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      </div>

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            操作確認
          </div>
        }
        onCancle={() => setDeletePermissions(false)}
        onConfirm={() => setDeletePermissions(false)}
        open={deletePermissions}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否刪除角色？</span>
      </CustomModal>

      <CustomModal
        title={
          <div className="flex flex-row justify-between ">
            <div>添加用戶</div>
            <CloseOutlined className="mr-[1rem]" />
          </div>
        }
        onCancle={() => setIsAddNewUser(false)}
        onConfirm={() => setIsAddNewUser(false)}
        open={isAddNewUser}
        className={"customDeviceModal"}
      >
        <Transfer
          dataSource={data}
          showSearch
          render={(data) => data.userName}
          titles={["标题"]}
          listStyle={{
            width: 280,
            height: 250,
          }}
        />
      </CustomModal>
    </div>
  );
};
