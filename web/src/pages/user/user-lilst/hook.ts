import { useDebounce, useRequest } from "ahooks";
import { message } from "antd";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-list-keys";
import {
  GetUserList,
  PostBatchDeleteUsers,
  PostCreateUsers,
  PostDeleteUser,
  PostUpdateUser,
} from "@/services/api/user";
import {
  IGetUserListRequest,
  IGetUserListResponse,
} from "@/services/dtos/user";

export const useAction = () => {
  const source = { ns: "userList" };

  const { t } = useAuth();

  const [isAddUser, setIsAddUser] = useState<boolean>(false);

  // const [isClosed, setIsClosed] = useState<boolean>(false);

  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const [keyword, setKeyword] = useState<string>("");

  const [isDeleteUsers, setIsDeleteUsers] = useState<boolean>(false);

  const filterKeyword = useDebounce(keyword, { wait: 500 });

  const [userListData, setUserListData] = useState<IGetUserListResponse>({
    count: 0,
    userProfiles: [],
  });

  const [deleteUserKeys, setDeleteUserKeys] = useState<string[]>([""]);

  const [updateUserId, setUpdateUserId] = useState<string>("");

  const [isDeleteUserLoading, setIsDeleteUserLoading] =
    useState<boolean>(false);

  const [getUserListRequest, setGetUserListRequest] =
    useState<IGetUserListRequest>({ PageIndex: 1, PageSize: 20 });

  const handelConfirmDeleteUsers = () => {
    if (deleteUserKeys.length < 1) return;

    const deleteUserFun = isDeleteUsers ? PostBatchDeleteUsers : PostDeleteUser;

    const data = isDeleteUsers ? deleteUserKeys : deleteUserKeys[0];

    setIsDeleteUserLoading(true);
    deleteUserFun(data as string & string[])
      .then(() => {
        setIsRemoveUser(false);
        handelGetUserList({ ...getUserListRequest, Keyword: filterKeyword });
        message.success(t(KEYS.REMOVE_USER_OK, source));
      })
      .catch((err) => {
        message.error(err.msg);
      })
      .finally(() => {
        setIsDeleteUserLoading(false);
      });
  };

  const handelGetSelectedUsers = async (userIds: string[]) => {
    let loading = true;

    try {
      const data = await PostCreateUsers(userIds);

      data && message.success(t(KEYS.ADD_USER_OK, source));
      loading = false;
    } catch (err) {
      loading = false;
      message.error((err as Error).message);
    }

    return loading;
  };

  const { run: handelGetUserList, loading: isGetUserListLoading } = useRequest(
    GetUserList,
    {
      manual: true,
      onSuccess: (res) => {
        res && setUserListData(res);
      },
      onError: (err) => {
        message.error(err.message);
        setUserListData({ count: 0, userProfiles: [] });
      },
    }
  );

  const { run: handelUpdateUserData, loading: isUpdateUserLoading } =
    useRequest(PostUpdateUser, {
      manual: true,
      onSuccess: () => {
        handelGetUserList({ ...getUserListRequest, Keyword: filterKeyword });
      },
      onError: (err) => {
        message.error(err.message);
      },
    });

  useEffect(() => {
    handelGetUserList({ ...getUserListRequest, Keyword: filterKeyword });
  }, [getUserListRequest, filterKeyword]);

  return {
    isAddUser,
    setIsAddUser,
    handelGetSelectedUsers,
    // setIsClosed,
    isRemoveUser,
    setIsRemoveUser,
    isResetPassword,
    setIsResetPassword,
    getUserListRequest,
    setGetUserListRequest,
    isGetUserListLoading,
    userListData,
    keyword,
    setKeyword,
    isDeleteUsers,
    setIsDeleteUsers,
    handelConfirmDeleteUsers,
    setDeleteUserKeys,
    isDeleteUserLoading,
    handelUpdateUserData,
    isUpdateUserLoading,
    t,
    source,
    updateUserId,
    setUpdateUserId,
  };
};
