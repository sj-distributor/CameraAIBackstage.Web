import {
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

export const PostDeleteUser = async (userProfileId: string) => {
  const response = await api.post("/api/CameraAi/user/delete", {
    userProfileId,
  });

  return response.data;
};

export const PostBatchDeleteUsers = async (userProfileIds: string[]) => {
  const response = await api.post("/api/CameraAi/user/batch/delete", {
    userProfileIds,
  });

  return response.data;
};

export const PostCreateUsers = async (staffIds: string[]) => {
  const response = await api.post<IUserProfileItem[]>(
    "/api/CameraAi/user/create",
    {
      staffIds,
    }
  );

  return response.data;
};

export const PostUpdateUser = async (userProfile: IUserProfileItem) => {
  const response = await api.post("/api/CameraAi/user/update", {
    userProfile,
  });

  return response.data;
};
