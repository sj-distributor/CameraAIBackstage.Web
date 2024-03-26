import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import {
  GetRolesUserByRoleId,
  PostDeleteRolesUsers,
} from "@/services/api/user-permission";
import {
  IRoleIdRequestParams,
  IUserByRoleIdData,
  IUserByRoleIdResponse,
} from "@/services/dtos/user-permission";

export const useAction = () => {
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

  const { id } = useParams();

  const { t } = useAuth();

  const navigate = useNavigate();

  const source = { ns: "userPermissions" };

  const [isDeletePermissions, setIsDeletePermissions] =
    useState<boolean>(false);

  const [isBatchDeleteUser, setIsBatchDeleteUser] = useState<boolean>(false);

  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [searchKeywordValue, setSearchKeywordValue] = useState<string>("");

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
          KeyWord: searchKeywordValue,
          RoleId: id,
        });
      })
      .catch((error) => message.error(error.msg));
  };

  const initGetRolesUsersList = (prams: IRoleIdRequestParams) => {
    setIsTableLoading(true);
    GetRolesUserByRoleId(prams)
      .then((res) => {
        if (res) setUserByRoleIdData(res ?? initialUserByRoleIdData);
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => setIsTableLoading(false));
  };

  const getAllRolesUsersList = (prams: IRoleIdRequestParams) => {
    GetRolesUserByRoleId(prams)
      .then((res) => {
        if (res) setUserByRoleIdAllData(res ?? initialUserByRoleIdData);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  useEffect(() => {
    initGetRolesUsersList({
      PageIndex: pageDto.pageIndex,
      PageSize: pageDto.pageSize,
      KeyWord: searchKeywordValue,
      RoleId: id,
    });
  }, [pageDto.pageIndex, pageDto.pageSize, searchKeywordValue]);

  useEffect(() => {
    getAllRolesUsersList({
      PageIndex: 1,
      PageSize: 2147483647,
      KeyWord: searchKeywordValue,
      RoleId: id,
    });
  }, [searchKeywordValue]);

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
    data,
    isTableLoading,
    pageDto,
    setPageDto,
    onSelectedAllRow,
    selectedRowKeys,
    setSearchValue,
    setSearchKeywordValue,
    searchValue,
    userByRoleIdData,
    setRecord,
    handleOperateDelete,
    onSelectedRow,
  };
};
