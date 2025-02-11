import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Input,
  Pagination,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Trans } from "react-i18next";

import KEYS from "@/i18n/language/keys/user-permissions-keys";
import { HierarchyStaffIdSourceEnum, TreeTypeEnum } from "@/services/dtos/tree";
import { IUserByRoleIdData } from "@/services/dtos/user-permission";

import { OperateConfirmModal } from "../operate-confirm";
import { TransferTree } from "../tranfer-tree";
import { useAction } from "./hook";

export const UserDistribute = () => {
  const {
    t,
    source,
    disableTreeStaffId,
    isDeletePermissions,
    setIsDeletePermissions,
    isBatchDeleteUser,
    setIsBatchDeleteUser,
    isAddNewUser,
    setIsAddNewUser,
    navigate,
    isTableLoading,
    pageDto,
    setPageDto,
    onSelectedAllRow,
    selectedRowKeys,
    setSearchValue,
    searchValue,
    userByRoleIdData,
    setRecord,
    handleOperateDelete,
    onSelectedRow,
    handelGetSelectedUsers,
    selectUser,
    setSelectUser,
    currentTeamStaff,
  } = useAction();

  const columns: ColumnsType<IUserByRoleIdData> = [
    {
      title: t(KEYS.USER_NAME, source),
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: t(KEYS.UPDATE_TIME, source),
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      render: (text: string) => {
        return <div>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</div>;
      },
    },
    {
      title: t(KEYS.OPERATION, source),
      key: "operate",
      render: (_: string, record: IUserByRoleIdData) => {
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
              onClick={() => {
                setIsDeletePermissions(true);
                setRecord(record);
              }}
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
      <div className="bg-white w-full h-[calc(100vh-5.5rem)] py-[1rem] px-[1.6rem]">
        <div className="flex-col justify-start pt-[.5rem] pl-[.5rem] overflow-scroll no-scrollbar">
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
          <div className="flex justify-between mt-[1.625rem] mb-[1rem]">
            <Input
              className="w-[17.5rem] h-[2.5rem]"
              placeholder={t(KEYS.SEARCHING_FOR_ROLE_NAMES, source)}
              suffix={
                <SearchOutlined
                  style={{
                    color: "#666472",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                  }}
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
                {t(KEYS.ADD_USER, source)}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-15.5rem)] justify-between">
          <div className="overflow-auto no-scrollbar pb-[1.125rem]">
            <Table
              rowKey={(item) => item.id}
              columns={columns}
              dataSource={userByRoleIdData.roleUsers}
              pagination={false}
              sticky={true}
              loading={isTableLoading}
              rowSelection={{
                type: "checkbox",
                selectedRowKeys,
                onSelect: (record, selected) => {
                  onSelectedRow(record, selected);
                },
                onSelectAll: (selected) => onSelectedAllRow(selected),
              }}
            />
          </div>
          <div className="flex justify-between items-center pt-[1rem]">
            <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
              <Trans
                i18nKey={KEYS.PAGINATION}
                ns="userPermissions"
                values={{ count: userByRoleIdData.count }}
                components={{
                  span: <span className="text-[#2853E3] font-light mx-1" />,
                }}
              />
            </div>
            <Pagination
              current={pageDto.pageIndex}
              pageSize={pageDto.pageSize}
              pageSizeOptions={[5, 10, 20]}
              total={userByRoleIdData.count}
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
        contentText={t(KEYS.CONFIRM_DELETE_USER, source)}
        handleOperateConfirm={handleOperateDelete}
      />
      <OperateConfirmModal
        isModelOpen={isBatchDeleteUser}
        setIsModelOpen={setIsBatchDeleteUser}
        contentText={t(KEYS.CONFIRM_DELETE_USERS_IN_BATCHES, source)}
        handleOperateConfirm={handleOperateDelete}
      />

      <TransferTree
        isModelOpen={isAddNewUser}
        setIsModelOpen={setIsAddNewUser}
        handelGetSelectedUsers={handelGetSelectedUsers}
        staffIdSource={HierarchyStaffIdSourceEnum.IntegerStaffId}
        type={TreeTypeEnum.UserPermission}
        disableTreeStaffId={disableTreeStaffId}
        currentTeamStaff={currentTeamStaff}
        selectUser={selectUser}
        setSelectUser={setSelectUser}
      />
    </div>
  );
};
