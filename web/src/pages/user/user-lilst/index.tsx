import {
  CloseOutlined,
  DownOutlined,
  SearchOutlined,
  WarningFilled,
} from "@ant-design/icons";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Pagination,
  Popover,
  Select,
  Spin,
  Switch,
  Table,
  TableProps,
} from "antd";
import { CustomTagProps } from "rc-select/lib/BaseSelect";
import { Trans } from "react-i18next";

import { CustomModal } from "@/components/custom-modal";
import KEYS from "@/i18n/language/keys/user-list-keys";
import { TreeTypeEnum } from "@/services/dtos/tree";
import { IUserDataItem, UserStatus } from "@/services/dtos/user";

import { TransferTree } from "../user-permissions/tranfer-tree";
import { BackGroundRolePermissionEnum } from "../user-permissions/user-newpermissions/props";
import { useAction } from "./hook";

export const UserList = () => {
  const {
    isAddUser,
    setIsAddUser,
    handelGetSelectedUsers,
    isRemoveUser,
    setIsRemoveUser,
    isResetPassword,
    setIsResetPassword,
    userListData,
    keyword,
    setKeyword,
    isDeleteUsers,
    setIsDeleteUsers,
    handelConfirmDeleteUsers,
    setDeleteUserKeys,
    isDeleteUserLoading,
    handelUpdateUserData,
    isUpdateUserLoading,
    t,
    source,
    updateUserId,
    setUpdateUserId,
    myPermissions,
    language,
    handelGetUserList,
    filterKeyword,
    disableTreeStaffId,
    navigate,
    form,
    openDrawer,
    setOpenDrawer,
    selectRange,
    setSelectRange,
    selectUser,
    setSelectUser,
    openAddUserDrawer,
    selectLoading,
    regionData,
    filterOption,
    handleCreateUser,
    currentTeam,
    adduserLoading,
    currentAccount,
    isSuperAdmin,
    selectTeamAdminModal,
    setSelectTeamAdminModal,
    setCurrentUserProfileId,
    adminGrantLoading,
    AdminGrant,
  } = useAction();

  const columns: TableProps<IUserDataItem>["columns"] = [
    {
      title: t(KEYS.USER_ID, source),
      dataIndex: "id",
    },
    {
      title: t(KEYS.NAME, source),
      dataIndex: "name",
    },
    {
      title: t(KEYS.DEPARTMENT, source),
      dataIndex: "department",
    },
    {
      title: t(KEYS.GROUP, source),
      dataIndex: "group",
    },
    {
      title: t(KEYS.POSITION, source),
      dataIndex: "position",
    },
    {
      title: t(KEYS.POSITION_STATUS, source),
      dataIndex: "positionStatus",
    },
    {
      title: t(KEYS.ENTERPRISE, source),
      hidden: !isSuperAdmin,
      render: () => {
        return <div />;
      },
    },
    {
      title: t(KEYS.PHONE, source),
      dataIndex: "phone",
    },
    {
      title: t(KEYS.WECHAT_NAME, source),
      dataIndex: "wechatName",
    },
    {
      title: t(KEYS.EMAIL, source),
      dataIndex: "email",
    },
    {
      title: t(KEYS.IS_QUALIFIED, source),
      dataIndex: "status",
      render: (status, record) => {
        return (
          <Switch
            checkedChildren={t(KEYS.ENABLE, source)}
            unCheckedChildren=""
            loading={String(record.id) === updateUserId && isUpdateUserLoading}
            value={status}
            className={`${
              language === "ch" ? "w-[3.125rem]" : "w-[4rem]"
            } text-[.625rem] customSwitch`}
            onChange={(status) => {
              if (
                myPermissions.includes(
                  status
                    ? BackGroundRolePermissionEnum.CanEnableCameraAiUserAccount
                    : BackGroundRolePermissionEnum.CanDisableCameraAiUserAccount
                ) ||
                isSuperAdmin
              ) {
                setUpdateUserId(String(record.id));
                handelUpdateUserData({
                  ...record,
                  status: status ? UserStatus.Enable : UserStatus.Disable,
                });
              }
            }}
          />
        );
      },
    },
    {
      title: t(KEYS.OPERATE, source),
      key: "operate",
      width: 200,
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
            <div className="flex items-center">
              {(myPermissions.includes(
                BackGroundRolePermissionEnum.CanViewDetailCameraAiUsers
              ) ||
                isSuperAdmin) && (
                <Button
                  type="link"
                  onClick={() =>
                    navigate(
                      `${
                        isSuperAdmin
                          ? "/team/userList/detail"
                          : "/user/list/detail"
                      }`,
                      { state: { record } }
                    )
                  }
                >
                  {t(KEYS.DETAIL, source)}
                </Button>
              )}

              {isSuperAdmin ? (
                <Popover
                  arrow={false}
                  placement="bottomLeft"
                  className="text-[#2853E3] cursor-pointer ml-[1rem]"
                  content={
                    <div className="w-[8rem] h-[3.5rem] flex flex-col justify-around pl-[1rem]">
                      <div
                        className="cursor-pointer text-[#2853E3]"
                        onClick={() => {
                          // getUserTeams(String(record.id));
                          setSelectTeamAdminModal(true);
                          setCurrentUserProfileId(String(record.id));
                        }}
                      >
                        設為團隊管理員
                      </div>
                      <div
                        className="cursor-pointer text-[#F04E4E]"
                        onClick={() => {
                          setIsDeleteUsers(false);
                          setDeleteUserKeys([String(record.id)]);
                          setIsRemoveUser(true);
                        }}
                      >
                        {t(KEYS.REMOVE, source)}
                      </div>
                    </div>
                  }
                >
                  更多
                  <DownOutlined
                    style={{ fontSize: "0.7rem", marginLeft: "1rem" }}
                  />
                </Popover>
              ) : (
                myPermissions.includes(
                  BackGroundRolePermissionEnum.CanDeleteCameraAiUserAccount
                ) &&
                record.id !== Number(currentTeam.leaderId) &&
                record.id !== currentAccount.id && (
                  <Button
                    type="link"
                    onClick={() => {
                      setIsDeleteUsers(false);
                      setDeleteUserKeys([String(record.id)]);
                      setIsRemoveUser(true);
                    }}
                  >
                    {t(KEYS.REMOVE, source)}
                  </Button>
                )
              )}
            </div>
          </ConfigProvider>
        );
      },
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white px-4 flex-1 pl-[1.6rem]">
      <div className="bg-white w-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          {t(KEYS.USER_LIST, source)}
        </span>
        <div className="flex justify-between">
          <div className="mb-[1rem] mt-[1.5rem] flex items-end">
            <Input
              className="w-[17.5rem] h-[2.5rem]"
              suffix={
                <SearchOutlined
                  style={{
                    color: "#666472",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                  }}
                />
              }
              placeholder={t(KEYS.SEARCH_PLACEHOLDER)}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <Select
              className="mx-[1rem] w-[13.5rem] h-[2.5rem]"
              placeholder={t(KEYS.STATUS)}
              value={userListData.Status}
              allowClear={true}
              options={[
                { value: UserStatus.Enable, label: t(KEYS.ENABLE, source) },
                {
                  value: UserStatus.Disable,
                  label: t(KEYS.NOT_ENABLE, source),
                },
              ]}
              onChange={(status) =>
                handelGetUserList({
                  PageIndex: 1,
                  Status: status,
                  Keyword: filterKeyword,
                  PageSize: userListData.PageSize,
                  TeamId: isSuperAdmin ? undefined : currentTeam.id,
                })
              }
            />
          </div>
          <div className="flex self-end mb-[.8rem]">
            {(myPermissions.includes(
              BackGroundRolePermissionEnum.CanBatchDeleteCameraAiUserAccount
            ) ||
              isSuperAdmin) && (
              <Button
                type="default"
                className="mr-[1rem] h-[2.75rem]"
                onClick={() => {
                  setIsDeleteUsers(true);
                  setIsRemoveUser(true);
                }}
              >
                {t(KEYS.BATCH_REMOVE_USERS, source)}
              </Button>
            )}
            {(myPermissions.includes(
              BackGroundRolePermissionEnum.CanAddCameraAiUserAccount
            ) ||
              isSuperAdmin) && (
              <Button
                type="primary"
                className="w-[7.25rem] h-[2.75rem]"
                onClick={() => {
                  isSuperAdmin ? setIsAddUser(true) : openAddUserDrawer();
                }}
              >
                <PlusOutlined /> {t(KEYS.ADD_USERS, source)}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-18.15rem)] overflow-y-auto no-scrollbar">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={userListData.userProfiles}
          pagination={false}
          sticky
          scroll={{ x: 1160 }}
          loading={userListData.loading}
          rowSelection={{
            type: "checkbox",
            onChange(selectedRowKeys) {
              setDeleteUserKeys(() =>
                selectedRowKeys.map((item) => String(item))
              );
            },
            getCheckboxProps: (record) => ({
              disabled:
                record.id === Number(currentTeam.leaderId) ||
                record.id === currentAccount.id,
            }),
          }}
        />
      </div>
      <div className="flex justify-between items-center py-[1rem]">
        <div className="text-[#929292]">
          <Trans
            i18nKey={KEYS.PAGINATION}
            ns="userList"
            values={{ count: userListData.count }}
            components={{
              span: <span className="text-[#2853E3] font-light mx-1" />,
            }}
          />
        </div>
        <div>
          <Pagination
            current={userListData.PageIndex}
            total={userListData.count}
            pageSize={userListData.PageSize}
            pageSizeOptions={[10, 20, 50]}
            onChange={(page, pageSize) =>
              handelGetUserList({
                PageSize: pageSize,
                PageIndex: page,
                Status: userListData.Status,
                Keyword: filterKeyword,
                TeamId: isSuperAdmin ? undefined : currentTeam.id,
              })
            }
            showSizeChanger
            showQuickJumper
          />
        </div>
      </div>

      <TransferTree
        isModelOpen={isAddUser}
        setIsModelOpen={setIsAddUser}
        handelGetSelectedUsers={handelGetSelectedUsers}
        staffIdSource={0}
        disableTreeStaffId={disableTreeStaffId}
        type={
          isSuperAdmin ? TreeTypeEnum.SuperAdminUserList : TreeTypeEnum.UserList
        }
        selectUser={selectUser}
        setSelectUser={setSelectUser}
      />

      <CustomModal
        title={
          <div>
            <WarningFilled className="text-[#ED940F] pr-[.625rem]" />
            {t(KEYS.OPERATION_CONFIRM, source)}
          </div>
        }
        onCancle={() => setIsRemoveUser(false)}
        onConfirm={() => handelConfirmDeleteUsers()}
        open={isRemoveUser}
        confirmLoading={isDeleteUserLoading}
        className={"customModal"}
      >
        <span className="pl-[2rem]">
          {t(
            isDeleteUsers ? KEYS.DELETE_USERS_PROMPT : KEYS.DELETE_USER_PROMPT,
            source
          )}
        </span>
      </CustomModal>

      <CustomModal
        title={
          <div className="flex flex-row justify-between">
            <div>{t(KEYS.EDIT_PASSWORD, source)}</div>
            <CloseOutlined onClick={() => setIsResetPassword(false)} />
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
              <span className="text-[0.8rem]">
                {t(KEYS.CURRENT_PASSWORD, source)}
              </span>
              <Input
                placeholder={t(KEYS.PLEASE_ENTRE, source)}
                className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
              />
            </div>
          </div>
          <div className="flex justify-start mb-[1rem] ml-[1rem] items-center">
            <span className="text-[0.8rem]">
              {t(KEYS.NEW_PASSWORD, source)}
            </span>
            <Input
              placeholder={t(KEYS.PLEASE_ENTRE, source)}
              className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
            />
          </div>
          <div className="flex justify-start items-center">
            <span className="text-[0.8rem]">
              {t(KEYS.CONFIRM_PASSWORD, source)}
            </span>
            <Input
              placeholder={t(KEYS.PLEASE_ENTRE, source)}
              className="h-[1.7rem] rounded w-[23rem] ml-[0.5rem]"
            />
          </div>
        </div>
      </CustomModal>

      <CustomModal
        title={<div>設置管理員</div>}
        open={selectTeamAdminModal}
        onCancle={() => {
          setSelectTeamAdminModal(false);
          // setSelectTeam("");
        }}
        onConfirm={() => {
          AdminGrant();

          // setSelectTeam("");

          // if (isEmpty(teamList)) {
          //   setSelectTeamAdminModal(false);
          // } else {
          //   AdminGrant();
          // }
        }}
        className={"customModal"}
        confirmLoading={adminGrantLoading}
      >
        <div>確認將其設置為團隊管理員？</div>
        {/* <div>
          {teamLoading ? (
            <Skeleton />
          ) : isEmpty(teamList) ? (
            <div>該用戶沒有加入任何團隊</div>
          ) : (
            <>
              <div className="mb-[1rem]">
                請選擇一個團隊，將此用戶設置為該團隊的管理員
              </div>
              {teamList.map((item, index) => {
                return (
                  <Radio
                    key={index}
                    checked={item.id === selectTeam}
                    onClick={() => setSelectTeam(item.id)}
                  >
                    {item.name}
                  </Radio>
                );
              })}
            </>
          )}
        </div> */}
      </CustomModal>

      <Drawer
        title={t(KEYS.ADD_USERS, source)}
        closable={false}
        open={openDrawer}
        width="33.75rem"
        styles={{ footer: { backgroundColor: "#F6F8FC" } }}
        onClose={() => setOpenDrawer(false)}
        keyboard={true}
        extra={
          <CloseOutlined
            className="cursor-pointer"
            onClick={() => setOpenDrawer(false)}
          />
        }
        footer={
          <div className="flex justify-end">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBorderColor: "#2853E3",
                    defaultColor: "#2853E3",
                  },
                },
              }}
            >
              <Button
                className="w-[6rem] h-[2.75rem]"
                onClick={() => setOpenDrawer(false)}
              >
                {t(KEYS.CANCEL, source)}
              </Button>
            </ConfigProvider>

            <Button
              className="w-[6rem] h-[2.75rem] ml-[1.5rem]"
              type="primary"
              loading={adduserLoading}
              onClick={handleCreateUser}
            >
              {t(KEYS.SUBMIT, source)}
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item label={t(KEYS.ADD_NEW_USER, source)} required={true}>
            <Select
              mode="multiple"
              open={false}
              suffixIcon={null}
              placeholder={t(KEYS.SELECT_USER, source)}
              value={selectUser.map((item) => ({
                label: item.title,
                value: item.key,
              }))}
              labelInValue
              onFocus={() => {
                if (!isAddUser) {
                  (document.activeElement as HTMLElement)?.blur();
                  setIsAddUser(true);
                }
              }}
              onDeselect={(selectedItem) => {
                setSelectUser((prev) =>
                  prev.filter((item) => item.value !== selectedItem.value)
                );
              }}
            />
          </Form.Item>
          <Form.Item label={t(KEYS.VIEW_RANGE, source)} required={true}>
            <Select
              value={selectRange}
              mode="multiple"
              allowClear
              options={regionData}
              filterOption={filterOption}
              dropdownRender={(menu) => (
                <>
                  {selectLoading ? (
                    <Spin className="flex justify-center" />
                  ) : (
                    <div>{menu}</div>
                  )}
                </>
              )}
              onChange={(value) => {
                if (value.every((item) => item === -1)) {
                  setSelectRange(value);
                } else {
                  const data = value.filter((item) => item !== -1);

                  setSelectRange(data);
                }
              }}
              onSelect={(value) => {
                if (value === -1) {
                  setSelectRange([value]);
                }
              }}
              tagRender={(props: CustomTagProps) => {
                const { label, closable, onClose } = props;

                if (selectRange.includes(-1)) {
                  return <span className="ml-2">{label}</span>;
                }

                return (
                  <span className="ant-select-selection-item !bg-[#F6F8FC] !px-3">
                    {label}
                    {closable && (
                      <span
                        onClick={onClose}
                        className="ant-select-selection-item-remove ml-2"
                      >
                        <CloseOutlined />
                      </span>
                    )}
                  </span>
                );
              }}
              popupClassName={"selectOptions"}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
