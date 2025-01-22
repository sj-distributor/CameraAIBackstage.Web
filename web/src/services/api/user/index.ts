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

// 旧 删除单个用户
export const PostDeleteUser = async (userProfileId: string) => {
  const response = await api.post("/api/CameraAi/user/delete", {
    userProfileId,
  });

  return response.data;
};

// 旧 批量删除用户
export const PostBatchDeleteUsers = async (userProfileIds: string[]) => {
  const response = await api.post("/api/CameraAi/user/batch/delete", {
    userProfileIds,
  });

  return response.data;
};

// 新 删除用户（单个+批量）
export const PostDeleteUserApi = async (data: {
  teamId: string;
  userProfileIds: string[];
}) => {
  const response = await api.post("/api/CameraAi/team/user/delete", data);

  return response.data;
};

// 旧 添加用户 还没加teamId
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
  const response = await api.post("/api/CameraAi/team/user/add", data);

  return response.data;
};

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
