import { useDebounce, useRequest } from "ahooks";
import { message } from "antd";
import { useEffect, useState } from "react";

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
  const [isAddUser, setIsAddUser] = useState<boolean>(false);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const [isSelectList, setIsSelectList] = useState<boolean>(false);

  const [expandedKeys, setExpandedKeys] = useState<string[]>(["Janny"]);

  const [checkedKeys, setCheckedKeys] = useState<string[]>(["Janny"]);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const [keyword, setKeyword] = useState<string>("");

  const [isDeleteUsers, setIsDeleteUsers] = useState<boolean>(false);

  const filterKeyword = useDebounce(keyword, { wait: 500 });

  const [userListData, setUserListData] = useState<IGetUserListResponse>({
    count: 0,
    userProfiles: [],
  });

  const [deleteUserKeys, setDeleteUserKeys] = useState<string[]>([""]);

  const [isDeleteUserLoading, setIsDeleteUserLoading] =
    useState<boolean>(false);

  const [getUserListRequest, setGetUserListRequest] =
    useState<IGetUserListRequest>({ PageIndex: 1, PageSize: 20 });

  const rowSelection = {
    getCheckboxProps: (record: { deviceId: string; name: string }) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const handelConfirmDeleteUsers = () => {
    if (deleteUserKeys.length < 1) return;

    const deleteUserFun = isDeleteUsers ? PostBatchDeleteUsers : PostDeleteUser;

    const data = isDeleteUsers ? deleteUserKeys : deleteUserKeys[0];

    setIsDeleteUserLoading(true);
    deleteUserFun(data as string & string[])
      .then(() => {
        setIsRemoveUser(false);
        handelGetUserList({ ...getUserListRequest, Keyword: filterKeyword });
        message.success("移除用戶成功");
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

      data && message.success("添加用户成功");
      loading = false;
    } catch (_) {
      loading = false;
      message.error("添加用户失败");
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
      },
    }
  );

  const { run: handelUpdateUserData, loading: isUpdateUserLoading } =
    useRequest(PostUpdateUser, {
      manual: true,
      onSuccess: (res) => {
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
    getUserListRequest,
    setGetUserListRequest,
    userListData,
    isGetUserListLoading,
    keyword,
    setKeyword,
    isDeleteUsers,
    setIsDeleteUsers,
    handelConfirmDeleteUsers,
    setDeleteUserKeys,
    isDeleteUserLoading,
    handelGetSelectedUsers,
    handelUpdateUserData,
    isUpdateUserLoading,
  };
};
