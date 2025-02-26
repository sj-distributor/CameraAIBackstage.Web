import { useDebounce, useRequest } from "ahooks";
import { App, Form } from "antd";
import { isEmpty } from "ramda";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/user-list-keys";
import { GetRegionPage } from "@/services/api/equipment/list";
import { GetTeamsMineApi } from "@/services/api/login";
import {
  GetUserList,
  PostAddUsersApi,
  PostAdminGrantApi,
  PostBatchDeleteUserApi,
  PostBatchDeleteUsers,
  PostCreateUsers,
  PostDeleteUser,
  PostDeleteUserApi,
  PostDisableUserApi,
  PostEnableUserApi,
} from "@/services/api/user";
import { ITeamListProps } from "@/services/dtos/login";
import {
  IGetUserListRequest,
  IGetUserListResponse,
  UserStatus,
} from "@/services/dtos/user";

import { ITreeData } from "../user-permissions/tranfer-tree/hook";

export interface IDto extends IGetUserListResponse {
  PageIndex: number;
  PageSize: number;
  Status?: UserStatus;
}

export const useAction = () => {
  const { message } = App.useApp();

  const source = { ns: "userList" };

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const {
    t,
    myPermissions,
    language,
    currentTeam,
    currentAccount,
    isSuperAdmin,
  } = useAuth();

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

  const [deleteUserKeys, setDeleteUserKeys] = useState<string[]>([]);

  const [updateUserId, setUpdateUserId] = useState<string>("");

  const [isDeleteUserLoading, setIsDeleteUserLoading] =
    useState<boolean>(false);

  const [getUserListRequest, setGetUserListRequest] =
    useState<IGetUserListRequest>({
      PageIndex: 1,
      PageSize: 20,
    });

  const [disableTreeStaffId, setDisableTreeStaffId] = useState<string[]>([]);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [regionData, setRegionData] = useState<
    { value: number; label: string }[]
  >([]);

  const [selectRange, setSelectRange] = useState<number[]>([]);

  const [selectLoading, setSelectLoading] = useState<boolean>(false);

  const [selectUser, setSelectUser] = useState<ITreeData[]>([]);

  const [adduserLoading, setAddUserLoading] = useState<boolean>(false);

  const handelConfirmDeleteUsers = () => {
    if (isEmpty(deleteUserKeys)) {
      message.info("請至少選擇一個用戶");

      return;
    }

    setIsDeleteUserLoading(true);

    const deletUserFun = isSuperAdmin
      ? isDeleteUsers
        ? PostBatchDeleteUsers(deleteUserKeys)
        : PostDeleteUser(deleteUserKeys[0])
      : isDeleteUsers
      ? PostBatchDeleteUserApi({
          teamId: currentTeam.id,
          userProfileIds: deleteUserKeys,
        })
      : PostDeleteUserApi({
          teamId: currentTeam.id,
          userProfileId: deleteUserKeys[0],
        });

    deletUserFun
      .then(() => {
        setIsRemoveUser(false);

        handelGetUserList({
          PageIndex: 1,
          PageSize: userListData.PageSize,
          Keyword: filterKeyword,
          Status: userListData.Status,
          TeamId: isSuperAdmin ? undefined : currentTeam.id,
        });

        getAllUserList();

        message.success(t(KEYS.REMOVE_USER_OK, source));
      })
      .catch((err) => {
        message.error((err as Error).message);
      })
      .finally(() => {
        setIsDeleteUserLoading(false);
      });
  };

  // 大后台 添加用户
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

      getAllUserList();

      loading = false;
    } catch (err) {
      loading = false;
      message.error((err as Error).message);
    }

    return loading;
  };

  const { run: handelUpdateUserData, loading: isUpdateUserLoading } =
    useRequest(
      (params) => {
        const api =
          params.status === UserStatus.Enable
            ? PostEnableUserApi
            : PostDisableUserApi;

        return api(params);
      },
      {
        manual: true,
        onSuccess: () => {
          handelGetUserList({
            PageIndex: 1,
            PageSize: userListData.PageSize,
            Keyword: filterKeyword,
            Status: userListData.Status,
            TeamId: currentTeam.id,
          });
        },
        onError: (err) => {
          message.error(err.message);
        },
      }
    );

  const getAllUserList = () => {
    GetUserList({
      PageIndex: 1,
      PageSize: 2147483647,
      TeamId: isSuperAdmin ? undefined : currentTeam.id,
    }).then((res) => {
      setDisableTreeStaffId(
        (res?.userProfiles ?? []).map((item) =>
          isSuperAdmin ? item.staffId : JSON.stringify(item.id)
        )
      );
    });
  };

  useEffect(() => {
    getAllUserList();
  }, []);

  useEffect(() => {
    handelGetUserList({
      PageIndex: 1,
      PageSize: userListData.PageSize,
      Keyword: filterKeyword,
      Status: userListData.Status,
      TeamId: isSuperAdmin ? undefined : currentTeam.id,
    });
  }, [filterKeyword]);

  const handelGetUserList = (data: IGetUserListRequest) => {
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

  const filterOption = (
    input: string,
    option?: {
      label?: string;
      value: number | string;
    }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const openAddUserDrawer = () => {
    setSelectUser([]);

    setOpenDrawer(true);

    setSelectLoading(true);

    GetRegionPage({ TeamId: currentTeam.id })
      .then((res) => {
        const data = [
          { value: -1, label: t(KEYS.NO_VIEW_RANGE, source) },
          ...(res?.regions ?? []).map((item) => ({
            value: item.areaId,
            label: item.areaName,
          })),
        ];

        setRegionData(data);

        setSelectRange([-1]);
      })
      .catch((err) => {
        setRegionData([{ value: -1, label: t(KEYS.NO_VIEW_RANGE, source) }]);

        message.error(`获取数据失败：${(err as Error).message}`);
      })
      .finally(() => setSelectLoading(false));
  };

  // 普通后台 添加用户
  const handleCreateUser = () => {
    if (isEmpty(selectUser) || isEmpty(selectRange)) {
      message.info("請補充完整信息！");

      return;
    }

    setAddUserLoading(true);

    PostAddUsersApi({
      teamId: currentTeam.id,
      staffIds: selectUser
        .map((item) => item.value)
        .filter((value): value is string => value !== undefined),
      regionIds: selectRange.filter((item) => item !== -1),
    })
      .then(() => {
        message.success("新增成功");

        setOpenDrawer(false);

        getAllUserList();

        handelGetUserList({
          PageIndex: 1,
          PageSize: userListData.PageSize,
          Keyword: "",
          Status: undefined,
          TeamId: currentTeam.id,
        });
      })
      .catch((err) => {
        message.error(`新增失败：${(err as Error).message}`);
      })
      .finally(() => setAddUserLoading(false));
  };

  const [selectTeamAdminModal, setSelectTeamAdminModal] =
    useState<boolean>(false);

  const [currentUserProfileId, setCurrentUserProfileId] = useState<string>("");

  const [teamList, setTeamList] = useState<ITeamListProps[]>([]);

  const [selectTeam, setSelectTeam] = useState<string>("");

  const [teamLoading, setTeamLoading] = useState<boolean>(false);

  const [adminGrantLoading, setAdminGrantLoading] = useState<boolean>(false);

  const getUserTeams = (UserProfileId: string) => {
    setTeamLoading(true);

    GetTeamsMineApi({ UserProfileId: UserProfileId })
      .then((res) => {
        setTeamList(res ?? []);
      })
      .catch((err) => {
        message.error(`获取團隊失敗：${(err as Error).message}`);
      })
      .finally(() => setTeamLoading(false));
  };

  const AdminGrant = () => {
    setAdminGrantLoading(true);

    PostAdminGrantApi({
      UserProfileId: currentUserProfileId,
      TeamId: selectTeam,
    })
      .then(() => {
        message.success("設置成功");

        setSelectTeam("");

        setSelectTeamAdminModal(false);
      })
      .catch((err) => {
        message.error(`設置失敗：${(err as Error).message}`);
      })
      .finally(() => setAdminGrantLoading(false));
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
    disableTreeStaffId,
    navigate,
    form,
    openDrawer,
    setOpenDrawer,
    selectRange,
    setSelectRange,
    selectUser,
    setSelectUser,
    openAddUserDrawer,
    selectLoading,
    regionData,
    filterOption,
    handleCreateUser,
    currentTeam,
    adduserLoading,
    currentAccount,
    isSuperAdmin,
    selectTeamAdminModal,
    setSelectTeamAdminModal,
    getUserTeams,
    teamList,
    teamLoading,
    setCurrentUserProfileId,
    setSelectTeam,
    selectTeam,
    adminGrantLoading,
    AdminGrant,
  };
};
