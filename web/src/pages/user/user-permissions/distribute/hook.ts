import { useDebounce } from "ahooks";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import {
  GetRolesUserByRoleId,
  PostCreateRolesUsers,
  PostDeleteRolesUsers,
} from "@/services/api/user-permission";
import {
  IRoleIdRequestParams,
  IUserByRoleIdData,
  IUserByRoleIdResponse,
} from "@/services/dtos/user-permission";
import { ITreeData } from "../tranfer-tree/hook";
import { GetUserList } from "@/services/api/user";

export const useAction = () => {
  const { id } = useParams();

  const { t, currentTeam } = useAuth();

  const navigate = useNavigate();

  const source = { ns: "userPermissions" };

  const [isDeletePermissions, setIsDeletePermissions] =
    useState<boolean>(false);

  const [isBatchDeleteUser, setIsBatchDeleteUser] = useState<boolean>(false);

  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState<IUserByRoleIdData[]>([]);

  const [selectUser, setSelectUser] = useState<ITreeData[]>([]);

  const [record, setRecord] = useState<IUserByRoleIdData>();

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });

  const initialUserByRoleIdData: IUserByRoleIdResponse = {
    count: 0,
    roleUsers: [],
  };

  const [userByRoleIdData, setUserByRoleIdData] =
    useState<IUserByRoleIdResponse>(initialUserByRoleIdData);

  const [userByRoleIdAllData, setUserByRoleIdAllData] =
    useState<IUserByRoleIdResponse>(initialUserByRoleIdData);

  const [disableTreeStaffId, setDisableTreeStaffId] = useState<string[]>([]);

  const [currentTeamStaff, setCurrentTeamStaff] = useState<string[]>([]);

  const filterKeyword = useDebounce(searchValue, { wait: 500 });

  const onSelectedAllRow = (selected: boolean) => {
    const selectedData = userByRoleIdAllData.roleUsers.map((item) => item.id);

    if (selected) {
      setSelectedRowKeys(selectedData);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const onSelectedRow = (
    row: IUserByRoleIdData | IUserByRoleIdData[],
    selected: boolean
  ) => {
    const rows = Array.isArray(row) ? row : [row];

    setSelectedRows((prev) => {
      if (selected) {
        return [...prev, ...rows];
      } else {
        return prev.filter((item) => !rows.find((row) => row.id === item.id));
      }
    });
  };

  const handleOperateDelete = () => {
    PostDeleteRolesUsers({
      roleUserIds: isBatchDeleteUser ? selectedRowKeys : [record?.id ?? 0],
    })
      .then(() => {
        initGetRolesUsersList({
          PageIndex: pageDto.pageIndex,
          PageSize: pageDto.pageSize,
          KeyWord: filterKeyword,
          RoleId: id,
        });

        getAllRolesUsersList();
      })
      .catch((error) => message.error((error as Error).message));
  };

  const handelGetSelectedUsers = async (userIds: string[]) => {
    let loading = true;

    const initial = {
      roleUsers: userIds
        .filter((userId) => !isNaN(Number(userId)))
        .map((items) => ({
          roleId: Number(id),
          userId: Number(items),
        })),
    };

    try {
      await PostCreateRolesUsers(initial);

      await initGetRolesUsersList({
        PageIndex: pageDto.pageIndex,
        PageSize: pageDto.pageSize,
        KeyWord: filterKeyword,
        RoleId: id,
      });

      getAllRolesUsersList();

      loading = false;
    } catch (err) {
      loading = false;
      message.error((err as Error).message);
    }

    return loading;
  };

  const initGetRolesUsersList = (prams: IRoleIdRequestParams) => {
    setIsTableLoading(true);
    GetRolesUserByRoleId(prams)
      .then((res) => {
        if (res) setUserByRoleIdData(res ?? initialUserByRoleIdData);
      })
      .catch(() => {
        message.error("獲取用戶列表數據失敗");
      })
      .finally(() => setIsTableLoading(false));
  };

  const getAllRolesUsersList = () => {
    GetRolesUserByRoleId({
      PageIndex: 1,
      PageSize: 2147483647,
      RoleId: id,
    })
      .then((res) => {
        setDisableTreeStaffId(
          (res?.roleUsers ?? []).map((item) => String(item.userId))
        );

        if (res) setUserByRoleIdAllData(res ?? initialUserByRoleIdData);
      })
      .catch(() => {
        navigate("/user/permissions");

        message.error("獲取全部用戶數據失敗");
      });
  };

  // 获取团队所有用户
  const getAllUserList = () => {
    GetUserList({
      PageIndex: 1,
      PageSize: 2147483647,
      TeamId: currentTeam.id,
    }).then((res) => {
      setCurrentTeamStaff(
        (res?.userProfiles ?? []).map((item) => String(item.userAccountId))
      );
    });
  };

  useEffect(() => {
    getAllUserList();
  }, []);

  useEffect(() => {
    initGetRolesUsersList({
      PageIndex: pageDto.pageIndex,
      PageSize: pageDto.pageSize,
      KeyWord: filterKeyword,
      RoleId: id,
    });
  }, [pageDto.pageIndex, pageDto.pageSize, filterKeyword]);

  useEffect(() => {
    getAllRolesUsersList();
  }, []);

  useEffect(() => {
    const newSelectedRowKeys = selectedRows.map((x) => x.id);

    setSelectedRowKeys(newSelectedRowKeys);
  }, [selectedRows]);

  return {
    t,
    source,
    isDeletePermissions,
    disableTreeStaffId,
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
  };
};
