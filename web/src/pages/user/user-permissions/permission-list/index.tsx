import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Pagination, Table } from "antd";
import { Trans } from "react-i18next";

import KEYS from "@/i18n/language/keys/user-permissions-keys";

import search from "../../../../assets/public/search.png";
import { OperateConfirmModal } from "../operate-confirm";
import { useAction } from "./hook";

export const UserPermissions = () => {
  const {
    t,
    source,
    setSearchValue,
    setSearchKeywordValue,
    searchValue,
    isDeletePermissions,
    setISDeletePermissions,
    navigate,
    isTableLoading,
    pageDto,
    setPageDto,
    onSelectedAllRow,
    data,
    selectedRowKeys,
  } = useAction();

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

  return (
    <div>
      <div className="bg-white w-full pr-[1rem] pl-[1.6rem] h-screen">
        <div className="bg-white w-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            {t(KEYS.ROLE_LIST, source)}
          </span>
          <div className="flex justify-between mt-[1rem] mb-[0.5rem]">
            <Input
              className="w-[17.5rem]"
              placeholder={t(KEYS.SEARCHING_FOR_ROLE_NAMES, source)}
              suffix={
                <img
                  src={search}
                  onClick={() => setSearchKeywordValue(searchValue)}
                />
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
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
              pagination={false}
              sticky={true}
              loading={isTableLoading}
              rowSelection={{
                type: "checkbox",
                selectedRowKeys,
                onSelectAll: (selected) => onSelectedAllRow(selected),
              }}
            />
          </div>
          <div className="flex justify-between items-center pt-[1rem]">
            <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
              <Trans
                i18nKey={KEYS.PAGINATION}
                ns="userPermissions"
                values={{ count: data.length }}
                components={{
                  span: <span className="text-[#2853E3] font-light mx-1" />,
                }}
              />
            </div>
            <Pagination
              current={pageDto.pageIndex}
              pageSize={pageDto.pageSize}
              pageSizeOptions={[5, 10, 20]}
              total={data.length}
              showQuickJumper
              showSizeChanger
              onChange={(page, pageSize) =>
                setPageDto({ pageIndex: page, pageSize })
              }
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
