import { useState } from "react";

export const useAction = () => {
  const [isAddUser, setIsAddUser] = useState<boolean>(false);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const [isSelectList, setIsSelectList] = useState<boolean>(false);

  const [expandedKeys, setExpandedKeys] = useState(["Janny"]);

  const [checkedKeys, setCheckedKeys] = useState(["Janny"]);

  const [selectedKeys, setSelectedKeys] = useState([]);

  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const rowSelection = {
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

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
  };
};
