import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Pagination, Table } from "antd";
import { useState } from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import KEYS from "@/i18n/language/keys/user-permissions-keys";

import search from "../../../../assets/public/search.png";
import { OperateConfirmModal } from "../operate-confirm";
import { useAction } from "./hook";

export const UserPermissions = () => {
  const [isDeletePermissions, setISDeletePermissions] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const rowSelection = {
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",
    }),
  };

  const { t, source } = useAction();

  const operateButtons = [
    {
      text: t(KEYS.ALLOT, source),
      onClick: () => navigate("/user/permissions/distribute"),
    },
    {
      text: t(KEYS.EDIT, source),
      onClick: () => navigate("/user/permissions/newOrUpdate"),
    },
    {
      text: t(KEYS.DELETE, source),
      onClick: () => setISDeletePermissions(true),
    },
  ];

  const columns = [
    {
      title: t(KEYS.ROLE_NAME, source),
      dataIndex: "characterName",
      className: "w-[16rem]",
    },
    {
      title: t(KEYS.ROLE_DESCRIBE, source),
      dataIndex: "roleDescription",
      className: "w-[62rem]",
    },
    {
      title: t(KEYS.OPERATION, source),
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
              {operateButtons.map((item, index) => (
                <Button
                  key={index}
                  type="link"
                  className="text-[.875rem] text-[#2853E3] h-[2rem] w-[6rem]"
                  onClick={item.onClick}
                >
                  {item.text}
                </Button>
              ))}
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
    },
    {
      key: "002",
      characterName: "管理員",
      roleDescription: "管理員角色",
    },
    {
      key: "003",
      characterName: "普通員工1",
      roleDescription: "系統默認角色",
    },
    {
      key: "004",
      characterName: "普通員工2",
      roleDescription: "自定義角色1",
    },
    {
      key: "005",
      characterName: "倉務主管",
      roleDescription: "自定義角色2",
    },
    {
      key: "006",
      characterName: "採購主管",
      roleDescription: "自定義角色3",
    },
  ];

  return (
    <div>
      <div className="bg-white w-full pr-[1rem] pl-[1.6rem] h-[calc(100vh-7rem)]">
        <div className="bg-white w-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            {t(KEYS.ROLE_LIST, source)}
          </span>
          <div className="flex justify-between mt-[1rem] mb-[0.5rem]">
            <div>
              <Input
                className="w-[17.5rem]"
                placeholder={t(KEYS.SEARCHING_FOR_ROLE_NAMES, source)}
                suffix={<img src={search} />}
              />
            </div>
            <Button
              type="primary"
              className="h-[2.75rem] w-[7.25rem]"
              onClick={() => navigate("/user/permissions/newOrUpdate")}
            >
              <PlusOutlined />
              {t(KEYS.ADD_ROLE, source)}
            </Button>
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
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
      <OperateConfirmModal
        isModelOpen={isDeletePermissions}
        setIsModelOpen={setISDeletePermissions}
        contentText={t(KEYS.CONFIRM_DELETE_ROLE, source)}
      />
    </div>
  );
};
