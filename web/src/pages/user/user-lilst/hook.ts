import { useAuth } from "@/hooks/use-auth";
import { GetUserListPage } from "@/services/api/userlist/list";
import { IUserListPageResponse } from "@/services/dtos/userlist/list";
import { message } from "antd";
import { useEffect, useState } from "react";

export const useAction = () => {
  const [isAddUser, setIsAddUser] = useState<boolean>(false);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const [isSelectList, setIsSelectList] = useState<boolean>(false);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const source = { ns: "userList" };

  const { t, language } = useAuth();

  const rowSelection = {
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  // const [userData, setUserData] = useState<IUserListPageResponse>({
  //   count: 10,
  //   data: [],
  // });

  // const [pageDto, setPageDto] = useState({
  //   PageIndex: 1,
  //   PageSize: 10,
  // });

  // useEffect(() => {
  //   GetUserListPage({
  //     PageIndex: pageDto.PageIndex,
  //     PageSize: pageDto.PageSize,
  //   })
  //     .then((res) => {
  //       setUserData(res.data);
  //     })
  //     .catch((err) => {
  //       message.error(err);
  //       setUserData([]);
  //     });
  // }, [pageDto]);

  return {
    isAddUser,
    setIsAddUser,
    isDeleteUser,
    setIsDeleteUser,
    isClosed,
    setIsClosed,
    isRemoveUser,
    setIsRemoveUser,
    isResetPassword,
    setIsResetPassword,
    isSelectList,
    setIsSelectList,
    rowSelection,
    expandedKeys,
    setExpandedKeys,
    checkedKeys,
    setCheckedKeys,
    selectedKeys,
    setSelectedKeys,
    autoExpandParent,
    setAutoExpandParent,
    source,
    t,
    language,
    // pageDto,
    // setPageDto,
  };
};
