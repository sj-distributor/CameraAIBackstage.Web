import {
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Input,
  Pagination,
  Table,
  Transfer,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-permissions-keys";

import { useAction } from "./hook";

export const UserDistribute = () => {
  const [deletePermissions, setDeletePermissions] = useState<boolean>(false);

  const [batchDeletUser, setBatchDeleteUser] = useState<boolean>(false);

  const [isAddNewRole, setIsAddNewRole] = useState<boolean>(false);

  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const navigate = useNavigate();

  const { t, source } = useAction();

  const rowSelection = {
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",
    }),
  };

  const columns = [
    {
      title: t(KEYS.USER_NAME, source),
      dataIndex: "userName",
    },
    {
      title: t(KEYS.UPDATE_TIME, source),
      dataIndex: "updateTime",
    },
    {
      title: t(KEYS.OPERATION, source),
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
              className="text-[.875rem] text-[#2853E3] h-[2rem] w-[6rem]"
              onClick={() => setDeletePermissions(true)}
            >
              {t(KEYS.REMOVE, source)}
            </Button>
          </ConfigProvider>
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
      <div className="bg-white w-full h-[calc(100vh-7rem)] p-[1rem]">
        <div className="flex-col justify-start pt-[1rem] pl-[.5rem] overflow-scroll no-scrollbar">
          <Breadcrumb
            items={[
              {
                title: (
                  <div onClick={() => navigate("/user/permissions")}>
                    角色列表
                  </div>
                ),
              },
              {
                title: "角色名单",
              },
            ]}
            className="text-[1.125rem] font-semibold"
          />
          <div className="flex justify-between mt-[1.625rem] mb-[.625rem]">
            <Input className="w-[17.5rem]" placeholder="搜索角色名稱" />
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
                onClick={() => setIsAddNewUser(true)}
              >
                <PlusOutlined />
                添加用户
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-17rem)] justify-between">
          <div className="overflow-auto no-scrollbar pb-[1.125rem]">
            <Table
              rowKey={(record) => record.deviceId}
              columns={columns}
              dataSource={data}
              rowSelection={rowSelection}
              pagination={false}
              sticky={true}
            />
          </div>
          <div className="flex justify-between items-center pt-[1rem]">
            <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
              <Trans
                i18nKey={KEYS.PAGINATION}
                ns="userPermissions"
                values={{ count: 200 }}
                components={{
                  span: <span className="text-[#2853E3] font-light mx-1" />,
                }}
              />
            </div>
            <Pagination
              current={1}
              total={200}
              pageSize={10}
              pageSizeOptions={[5, 10, 20]}
              showSizeChanger
              showQuickJumper
            />
          </div>
        </div>
      </div>
      <div>
        <CustomModal
          title={
            <div className="flex flex-row justify-content">
              <div className="text-gray-300 mr-[0.5rem]">角色列表/</div>
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
        </CustomModal>
      </div>
      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[0.625rem]" />
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
          <div>
            <WarningFilled className="text-[#ED940F] pr-[0.625rem]" />
            操作確認
          </div>
        }
        onCancle={() => setBatchDeleteUser(false)}
        onConfirm={() => setBatchDeleteUser(true)}
        open={batchDeletUser}
        className={"customModal"}
      >
        <span className="pl-[2rem]">請確認是否批量刪除用戶？</span>
      </CustomModal>
      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>添加用戶</div>
            <CloseOutlined
              className="mr-[1rem]"
              onClick={() => setIsAddNewUser(false)}
            />
          </div>
        }
        onCancle={() => setIsAddNewUser(false)}
        onConfirm={() => setIsAddNewUser(false)}
        open={isAddNewUser}
        className={"customDeviceModal"}
        modalWidth="42.5rem"
      >
        <Transfer
          dataSource={data}
          showSearch
          render={(data) => data.userName}
          listStyle={{
            width: 300,
            height: 250,
          }}
          selectionsIcon={<></>}
          selectAllLabels={["标题", `已選擇1項`]}
          showSelectAll={false}
        />
      </CustomModal>
    </div>
  );
};
