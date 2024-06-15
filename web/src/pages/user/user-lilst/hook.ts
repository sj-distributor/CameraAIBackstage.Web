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
  UserStatus,
} from "@/services/dtos/user";

export interface IDto extends IGetUserListResponse {
  PageIndex: number;
  PageSize: number;
  Status?: UserStatus;
}

export const useAction = () => {
  const source = { ns: "userList" };

  const { t, myPermissions, language } = useAuth();

  const [isAddUser, setIsAddUser] = useState<boolean>(false);

  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const [keyword, setKeyword] = useState<string>("");

  const [isDeleteUsers, setIsDeleteUsers] = useState<boolean>(false);

  const filterKeyword = useDebounce(keyword, { wait: 500 });

  const [userListData, setUserListData] = useState<IDto>({
    count: 0,
    userProfiles: [],
    loading: false,
    PageIndex: 1,
    PageSize: 20,
    Status: undefined,
  });

  const [deleteUserKeys, setDeleteUserKeys] = useState<string[]>([""]);

  const [updateUserId, setUpdateUserId] = useState<string>("");

  const [isDeleteUserLoading, setIsDeleteUserLoading] =
    useState<boolean>(false);

  const [getUserListRequest, setGetUserListRequest] =
    useState<IGetUserListRequest>({
      PageIndex: 1,
      PageSize: 20,
    });

  const handelConfirmDeleteUsers = () => {
    if (deleteUserKeys.length < 1) return;

    const deleteUserFun = isDeleteUsers ? PostBatchDeleteUsers : PostDeleteUser;

    const data = isDeleteUsers ? deleteUserKeys : deleteUserKeys[0];

    setIsDeleteUserLoading(true);
    deleteUserFun(data as string & string[])
      .then(() => {
        setIsRemoveUser(false);
        handelGetUserList({
          PageIndex: 1,
          PageSize: userListData.PageSize,
          Keyword: filterKeyword,
          Status: userListData.Status,
        });
        message.success(t(KEYS.REMOVE_USER_OK, source));
      })
      .catch((err) => {
        message.error(err.msg || err.message || err);
      })
      .finally(() => {
        setIsDeleteUserLoading(false);
      });
  };

  const handelGetSelectedUsers = async (userIds: string[]) => {
    let loading = true;

    try {
      await PostCreateUsers(userIds);

      message.success(t(KEYS.ADD_USER_OK, source));

      handelGetUserList({
        PageIndex: 1,
        PageSize: userListData.PageSize,
        Keyword: filterKeyword,
        Status: userListData.Status,
      });

      loading = false;
    } catch (err) {
      loading = false;
      message.error((err as Error).message);
    }

    return loading;
  };

  // const { run: handelGetUserList, loading: isGetUserListLoading } = useRequest(
  //   GetUserList,
  //   {
  //     manual: true,
  //     onSuccess: (res) => {
  //       res && setUserListData(res);
  //     },
  //     onError: (err) => {
  //       message.error(err.message);
  //       setUserListData({ count: 0, userProfiles: [] });
  //     },
  //   }
  // );

  const { run: handelUpdateUserData, loading: isUpdateUserLoading } =
    useRequest(PostUpdateUser, {
      manual: true,
      onSuccess: () => {
        handelGetUserList({
          PageIndex: 1,
          PageSize: userListData.PageSize,
          Keyword: filterKeyword,
          Status: userListData.Status,
        });
      },
      onError: (err) => {
        message.error(err.message);
      },
    });

  useEffect(() => {
    handelGetUserList({
      PageIndex: 1,
      PageSize: userListData.PageSize,
      Keyword: filterKeyword,
      Status: userListData.Status,
    });
  }, [filterKeyword]);

  useEffect(() => {
    handelGetUserList({
      PageIndex: userListData.PageIndex,
      PageSize: userListData.PageSize,
    });
  }, []);

  const handelGetUserList = (data: any) => {
    setUserListData((prev) => ({
      ...prev,
      loading: true,
    }));

    GetUserList(data)
      .then((res) => {
        setTimeout(() => {
          setUserListData((prev) => ({
            ...prev,
            loading: false,
            count: res?.count ?? 0,
            userProfiles: res?.userProfiles ?? [],
            PageIndex: data.PageIndex,
            PageSize: data.PageSize,
            keyword: data?.Keyword ?? "",
            Status: data?.Status ?? undefined,
          }));
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          setUserListData((prev) => ({
            ...prev,
            loading: false,
            count: 0,
            userProfiles: [],
            PageIndex: 0,
            PageSize: 0,
            keyword: "",
            Status: undefined,
          }));
        }, 1000);
      });
  };

  return {
    isAddUser,
    setIsAddUser,
    handelGetSelectedUsers,
    isRemoveUser,
    setIsRemoveUser,
    isResetPassword,
    setIsResetPassword,
    getUserListRequest,
    setGetUserListRequest,
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
    myPermissions,
    language,
    handelGetUserList,
    filterKeyword,
  };
};
