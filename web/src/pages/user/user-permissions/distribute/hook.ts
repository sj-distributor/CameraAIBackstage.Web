import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

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

  const { t } = useAuth();

  const navigate = useNavigate();

  const source = { ns: "userPermissions" };

  const [isDeletePermissions, setIsDeletePermissions] =
    useState<boolean>(false);

  const [isBatchDeleteUser, setIsBatchDeleteUser] = useState<boolean>(false);

  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [searchKeywordValue, setSearchKeywordValue] = useState<string>("");

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const [selectedRows, setSelectedRows] = useState<
    {
      key: string;
      characterName: string;
      roleDescription: string;
    }[]
  >([]);

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [pageDto, setPageDto] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 5,
  });

  const onSelectedAllRow = (selected: boolean) => {
    const selectedData = data.map((item) => item.key);

    if (selected) {
      setSelectedRowKeys(selectedData);
      setSelectedRows(data);
    } else {
      setSelectedRowKeys([]);
      setSelectedRows([]);
    }
  };

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
  };
};
