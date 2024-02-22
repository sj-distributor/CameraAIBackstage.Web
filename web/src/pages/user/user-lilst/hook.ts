import { useState } from "react";

export const useAction = () => {
  const [isAddUser, setIsAddUser] = useState<boolean>(false);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [removeUser, setRemoveUser] = useState<boolean>(false);

  const [resetPassword, setResetPassword] = useState<boolean>(false);

  return {
    isAddUser,
    setIsAddUser,
    isDeleteUser,
    setIsDeleteUser,
    isClosed,
    setIsClosed,
    removeUser,
    setRemoveUser,
    resetPassword,
    setResetPassword,
  };
};
