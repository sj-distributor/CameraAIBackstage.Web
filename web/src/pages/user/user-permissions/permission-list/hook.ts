import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

export const useAction = () => {
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
    {
      key: "007",
      characterName: "採購主管",
      roleDescription: "自定義角色3",
    },
    {
      key: "008",
      characterName: "採購主管",
      roleDescription: "自定義角色3",
    },
    {
      key: "009",
      characterName: "採購主管",
      roleDescription: "自定義角色3",
    },
  ];

  const { t } = useAuth();

  const navigate = useNavigate();

  const source = { ns: "userPermissions" };

  const [searchValue, setSearchValue] = useState<string>("");

  // const [searchKeywordValue, setSearchKeywordValue] = useState<string>("");

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // const [selectedRows, setSelectedRows] = useState<
  //   {
  //     key: string;
  //     characterName: string;
  //     roleDescription: string;
  //   }[]
  // >([]);

  // const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [isDeletePermissions, setISDeletePermissions] =
    useState<boolean>(false);

  const onSelectedAllRow = (selected: boolean) => {
    const selectedData = data.map((item) => item.key);

    if (selected) {
      setSelectedRowKeys(selectedData);
      // setSelectedRows(data);
    } else {
      setSelectedRowKeys([]);
      // setSelectedRows([]);
    }
  };

  return {
    t,
    source,
    setSearchValue,
    // setSearchKeywordValue,
    searchValue,
    isDeletePermissions,
    setISDeletePermissions,
    navigate,
    // isTableLoading,
    pageDto,
    setPageDto,
    onSelectedAllRow,
    data,
    selectedRowKeys,
  };
};
