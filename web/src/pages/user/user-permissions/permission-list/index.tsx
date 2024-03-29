import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Trans } from "react-i18next";

import KEYS from "@/i18n/language/keys/user-permissions-keys";
import { IRole } from "@/services/dtos/user-permission";

import search from "../../../../assets/public/search.png";
import { OperateConfirmModal } from "../operate-confirm";
import { BackGroundRolePermissionEnum } from "../user-newpermissions/props";
import { useAction } from "./hook";

export const UserPermissions = () => {
  const {
    t,
    source,
    setSearchValue,
    searchValue,
    isDeletePermissions,
    setISDeletePermissions,
    navigate,
    isTableLoading,
    pageDto,
    setPageDto,
    onSelectedAllRow,
    onSelectedRow,
    roleByPermissionData,
    handleOperateDelete,
    setRecord,
    myPermissions,
  } = useAction();

  const operateButtons = [
    {
      text: t(KEYS.ALLOT, source),
      onClick: (record: IRole) =>
        navigate(`/user/permissions/distribute/${record.id}`),
      permissions: BackGroundRolePermissionEnum.CanCreateRoleUser,
    },
    {
      text: t(KEYS.EDIT, source),
      onClick: (record: IRole) =>
        navigate(`/user/permissions/roles/${record.id}`),
      permissions: BackGroundRolePermissionEnum.CanUpdatePermissionsOfRole,
    },
    {
      text: t(KEYS.DELETE, source),
      onClick: (record: IRole) => {
        setISDeletePermissions(true);
        setRecord(record);
      },
      permissions: BackGroundRolePermissionEnum.CanDeleteRoles,
    },
  ];

  const columns: ColumnsType<IRole> = [
    {
      title: t(KEYS.ROLE_NAME, source),
      dataIndex: "displayName",
      key: "displayName",
      className: "w-[16rem]",
    },
    {
      title: t(KEYS.ROLE_DESCRIBE, source),
      dataIndex: "description",
      key: "description",
      className: "w-[62rem]",
    },
    {
      title: t(KEYS.OPERATION, source),
      key: "operate",
      className: "flex flex-items-center",
      render: (_, record) => {
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
              {record.id === 1 ? (
                myPermissions.includes(
                  BackGroundRolePermissionEnum.CanCreateRoleUser
                ) && (
                  <Button
                    type="link"
                    className="text-[.875rem] text-[#2853E3] h-[2rem] w-[6rem]"
                    onClick={() =>
                      navigate(`/user/permissions/distribute/${record.id}`)
                    }
                  >
                    {t(KEYS.ALLOT, source)}
                  </Button>
                )
              ) : (
                <>
                  {operateButtons.map((item, index) => (
                    <>
                      {myPermissions.includes(item.permissions) && (
                        <Button
                          key={index}
                          type="link"
                          className="text-[.875rem] text-[#2853E3] h-[2rem] w-[6rem]"
                          onClick={() => item.onClick(record)}
                        >
                          {item.text}
                        </Button>
                      )}
                    </>
                  ))}
                </>
              )}
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
          <div className="flex justify-between mb-[1rem] mt-[1.5rem] ">
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
            {myPermissions.includes(
              BackGroundRolePermissionEnum.CanGrantPermissionsIntoRole
            ) && (
              <Button
                type="primary"
                className="h-[2.75rem] w-[7.25rem]"
                onClick={() => navigate("/user/permissions/roles/new")}
              >
                <PlusOutlined />
                {t(KEYS.ADD_ROLE, source)}
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-15.4rem)] justify-between">
          <div className="overflow-auto no-scrollbar pb-[1.125rem]">
            <Table
              rowKey={(item) => item?.id ?? 0}
              columns={columns}
              pagination={false}
              sticky={true}
              loading={isTableLoading}
              dataSource={roleByPermissionData.rolePermissionData.map(
                (item) => item.role
              )}
              rowSelection={{
                type: "checkbox",
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
                values={{ count: roleByPermissionData.count }}
                components={{
                  span: <span className="text-[#2853E3] font-light mx-1" />,
                }}
              />
            </div>
            <Pagination
              current={pageDto.pageIndex}
              pageSize={pageDto.pageSize}
              pageSizeOptions={[5, 10, 20]}
              total={roleByPermissionData.count}
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
        handleOperateConfirm={handleOperateDelete}
      />
    </div>
  );
};
