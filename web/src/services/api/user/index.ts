import {
  IAddUserRequest,
  IGetUserListRequest,
  IGetUserListResponse,
  IUserProfileItem,
} from "@/services/dtos/user";

import { api } from "../http-client";

export const GetUserList = async (data: IGetUserListRequest) => {
  const response = await api.get<IGetUserListResponse>(
    "/api/CameraAi/user/page",
    { params: data }
  );

  return response.data;
};

// 大后台 删除单个用户
export const PostDeleteUser = async (userProfileId: string) => {
  const response = await api.post("/api/CameraAi/user/delete", {
    userProfileId,
  });

  return response.data;
};

// 大后台 批量删除用户
export const PostBatchDeleteUsers = async (userProfileIds: string[]) => {
  const response = await api.post("/api/CameraAi/user/batch/delete", {
    userProfileIds,
  });

  return response.data;
};

// 普通后台 删除单个用户
export const PostDeleteUserApi = async (data: {
  teamId: string;
  userProfileId: string;
}) => {
  const response = await api.post("/api/CameraAi/team/user/delete", data);

  return response.data;
};

// 普通后台 批量删除用户
export const PostBatchDeleteUserApi = async (data: {
  teamId: string;
  userProfileIds: string[];
}) => {
  const response = await api.post("/api/CameraAi/team/user/delete/batch", data);

  return response.data;
};

// 大后台 添加用户 不需要加teamId
export const PostCreateUsers = async (staffIds: string[]) => {
  const response = await api.post<IUserProfileItem[]>(
    "/api/CameraAi/user/create",
    {
      staffIds,
    }
  );

  return response.data;
};

// 新1.21 添加用戶
export const PostAddUsersApi = async (data: IAddUserRequest) => {
  const response = await api.post("/api/CameraAi/user/create/assign", data);

  return response.data;
};

// 新1.21 更改用户状态(开启)
export const PostEnableUserApi = async (userProfile: IUserProfileItem) => {
  const response = await api.post("/api/CameraAi/user/enable", {
    userProfile,
  });

  return response.data;
};

// 新1.21 更改用户状态(关闭)
export const PostDisableUserApi = async (userProfile: IUserProfileItem) => {
  const response = await api.post("/api/CameraAi/user/disable", {
    userProfile,
  });

  return response.data;
};

// 旧 更改用户状态
export const PostUpdateUser = async (userProfile: IUserProfileItem) => {
  const response = await api.post("/api/CameraAi/user/update", {
    userProfile,
  });

  return response.data;
};

export const PostAdminGrantApi = async (data: {
  UserProfileId: string;
  TeamId: string;
}) => {
  const response = await api.post(
    `/api/CameraAi/team/user/admin/grant?UserProfileId=${data.UserProfileId}&TeamId=${data.TeamId}`
  );

  return response.data;
};
