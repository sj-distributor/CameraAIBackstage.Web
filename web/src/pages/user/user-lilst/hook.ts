import { useState } from "react";

export const useAction = () => {
  const [isAddUser, setIsAddUser] = useState<boolean>(false);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const [isSelectList, setIsSelectList] = useState<boolean>(false);

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
  };
};
