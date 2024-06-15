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
import { useDebounce } from "ahooks";

export const useAction = () => {
  const { id } = useParams();

  const { t } = useAuth();

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

  const [record, setRecord] = useState<IUserByRoleIdData>();

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const initialUserByRoleIdData: IUserByRoleIdResponse = {
    count: 0,
    roleUsers: [],
  };

  const [userByRoleIdData, setUserByRoleIdData] =
    useState<IUserByRoleIdResponse>(initialUserByRoleIdData);

  const [userByRoleIdAllData, setUserByRoleIdAllData] =
    useState<IUserByRoleIdResponse>(initialUserByRoleIdData);

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
      })
      .catch((error) => message.error(error.msg || error.message || error));
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

  const getAllRolesUsersList = (prams: IRoleIdRequestParams) => {
    GetRolesUserByRoleId(prams)
      .then((res) => {
        if (res) setUserByRoleIdAllData(res ?? initialUserByRoleIdData);
      })
      .catch(() => {
        navigate("/user/permissions");
        message.error("獲取全部用戶數據失敗");
      });
  };

  useEffect(() => {
    initGetRolesUsersList({
      PageIndex: pageDto.pageIndex,
      PageSize: pageDto.pageSize,
      KeyWord: filterKeyword,
      RoleId: id,
    });
  }, [pageDto.pageIndex, pageDto.pageSize, filterKeyword]);

  useEffect(() => {
    getAllRolesUsersList({
      PageIndex: 1,
      PageSize: 2147483647,
      KeyWord: filterKeyword,
      RoleId: id,
    });
  }, [filterKeyword]);

  useEffect(() => {
    const newSelectedRowKeys = selectedRows.map((x) => x.id);

    setSelectedRowKeys(newSelectedRowKeys);
  }, [selectedRows]);

  return {
    t,
    source,
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
  };
};
