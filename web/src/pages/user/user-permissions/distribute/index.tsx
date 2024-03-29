import { PlusOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Input,
  Pagination,
  Table,
} from "antd";
import { Trans } from "react-i18next";

import KEYS from "@/i18n/language/keys/user-permissions-keys";

import search from "../../../../assets/public/search.png";
import { OperateConfirmModal } from "../operate-confirm";
import { TransferTree } from "../tranfer-tree";
import { useAction } from "./hook";

export const UserDistribute = () => {
  const {
    t,
    source,
    isDeletePermissions,
    setIsDeletePermissions,
    isBatchDeleteUser,
    setIsBatchDeleteUser,
    isAddNewUser,
    setIsAddNewUser,
    navigate,
    data,
    isTableLoading,
    pageDto,
    setPageDto,
    onSelectedAllRow,
    selectedRowKeys,
    setSearchValue,
    setSearchKeywordValue,
    searchValue,
  } = useAction();

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
              onClick={() => setIsDeletePermissions(true)}
            >
              {t(KEYS.REMOVE, source)}
            </Button>
          </ConfigProvider>
        );
      },
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
                    {t(KEYS.ROLE_LIST, source)}
                  </div>
                ),
              },
              {
                title: t(KEYS.ROLE_NAME_LIST, source),
              },
            ]}
            className="text-[1.125rem] font-semibold"
          />
          <div className="flex justify-between mt-[1.625rem] mb-[.625rem]">
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
            <div>
              <Button
                className="h-[2.75rem] px-[1rem] min-w-[7.25rem] mr-[1rem]"
                onClick={() => setIsBatchDeleteUser(true)}
              >
                {t(KEYS.DELETE_USERS_IN_BATCHES, source)}
              </Button>
              <Button
                type="primary"
                className="h-[2.75rem] w-[7.25rem]"
                onClick={() => setIsAddNewUser(true)}
              >
                <PlusOutlined />
                {t(KEYS.ADD_ROLE, source)}
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
        setIsModelOpen={setIsDeletePermissions}
        contentText={t(KEYS.CONFIRM_DELETE_ROLE, source)}
      />
      <OperateConfirmModal
        isModelOpen={isBatchDeleteUser}
        setIsModelOpen={setIsBatchDeleteUser}
        contentText={t(KEYS.CONFIRM_DELETE_USERS_IN_BATCHES, source)}
      />
      <TransferTree
        isModelOpen={isAddNewUser}
        setIsModelOpen={setIsAddNewUser}
        data={data}
      />
    </div>
  );
};
