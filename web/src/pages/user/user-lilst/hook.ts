import { useState } from "react";

export const useAction = () => {
  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [removeUser, setRemoveUser] = useState<boolean>(false);

  const [resetPassword, setResetPassword] = useState<boolean>(false);

  return {
    isAddNewUser,
    setIsAddNewUser,
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
