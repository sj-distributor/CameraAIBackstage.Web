import { useDebounce } from "ahooks";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { GetRoles, PostDeleteRoles } from "@/services/api/user-permission";
import {
  IRequestRoles,
  IRole,
  IRoleByPermissionResponse,
  RoleSystemSourceEnum,
} from "@/services/dtos/user-permission";

export const useAction = () => {
  const { t, myPermissions } = useAuth();

  const navigate = useNavigate();

  const source = { ns: "userPermissions" };

  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [record, setRecord] = useState<IRole>();

  const [selectedRows, setSelectedRows] = useState<IRole[]>([]);

  const [isSearch, setIsSearch] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [isDeletePermissions, setISDeletePermissions] =
    useState<boolean>(false);

  const initialRoleByPermissionData: IRoleByPermissionResponse = {
    count: 0,
    rolePermissionData: [],
  };

  const [roleByPermissionData, setRoleByPermissionData] =
    useState<IRoleByPermissionResponse>(initialRoleByPermissionData);

  const [roleByPermissionAllData, setRoleByPermissionAllData] =
    useState<IRoleByPermissionResponse>(initialRoleByPermissionData);

  const filterKeyword = useDebounce(searchValue, { wait: 500 });

  const onSelectedAllRow = (selected: boolean) => {
    const selectedData = roleByPermissionAllData.rolePermissionData.map(
      (item) => item.role.id ?? 0
    );

    if (selected) {
      setSelectedRowKeys(selectedData);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const onSelectedRow = (row: IRole | IRole[], selected: boolean) => {
    const rows = Array.isArray(row) ? row : [row];

    setSelectedRows((prev) => {
      if (selected) {
        return [...prev, ...rows];
      } else {
        return prev.filter((item) => !rows.find((row) => row.id === item.id));
      }
    });
  };

  const initGetRolesList = (prams: IRequestRoles) => {
    setIsTableLoading(true);
    GetRoles(prams)
      .then((res) => {
        setRoleByPermissionData((prev) => ({
          ...prev,
          count: res?.count ?? 0,
          rolePermissionData: res?.rolePermissionData ?? [],
        }));

        setPageDto({ pageIndex: prams.PageIndex, pageSize: prams.PageSize });
      })
      .catch((err) => {
        message.error(err.msg);
        setRoleByPermissionData((prev) => ({
          ...prev,
          count: 0,
          rolePermissionData: [],
        }));
        setPageDto({ pageIndex: prams.PageIndex, pageSize: prams.PageSize });
      })
      .finally(() => setIsTableLoading(false));
  };

  const getRolesAllDataList = (prams: IRequestRoles) => {
    GetRoles(prams)
      .then((res) => {
        setRoleByPermissionData((prev) => ({
          ...prev,
          count: res?.count ?? 0,
          rolePermissionData: res?.rolePermissionData ?? [],
        }));
      })
      .catch(() => {
        message.error("獲取角色數據失敗");
        setRoleByPermissionData((prev) => ({
          ...prev,
          count: 0,
          rolePermissionData: [],
        }));
      });
  };

  const handleOperateDelete = () => {
    PostDeleteRoles({ roleIds: [record?.id ?? 0] })
      .then(() => {
        initGetRolesList({
          PageIndex: pageDto.pageIndex,
          PageSize: pageDto.pageSize,
          KeyWord: filterKeyword,
          systemSource: RoleSystemSourceEnum.CameraAi,
        });
      })
      .catch((error) => message.error(error.msg));
  };

  useEffect(() => {
    initGetRolesList({
      PageIndex: pageDto.pageIndex,
      PageSize: pageDto.pageSize,
      KeyWord: filterKeyword,
      systemSource: RoleSystemSourceEnum.CameraAi,
    });
  }, [pageDto.pageIndex, pageDto.pageSize]);

  useEffect(() => {
    isSearch &&
      getRolesAllDataList({
        PageIndex: 1,
        PageSize: 5,
        KeyWord: filterKeyword,
        systemSource: RoleSystemSourceEnum.CameraAi,
      });
  }, [filterKeyword]);

  useEffect(() => {
    setIsSearch(true);
  }, []);

  useEffect(() => {
    const newSelectedRowKeys = selectedRows.map((x) => x.id ?? 0);

    setSelectedRowKeys(newSelectedRowKeys);
  }, [selectedRows]);

  return {
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
    selectedRowKeys,
    roleByPermissionData,
    handleOperateDelete,
    setRecord,
    onSelectedRow,
    myPermissions,
    setRoleByPermissionAllData,
  };
};
