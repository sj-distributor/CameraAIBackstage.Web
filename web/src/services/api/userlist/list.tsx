import {
  IUserCreateRequest,
  IUserDisableId,
  IUserLiastPageRequest,
  IUserListPageResponse,
  IUserUpdateRequest,
} from "@/services/dtos/userlist/list";
import { api } from "../http-client";

export const GetUserListPage = async (data: IUserLiastPageRequest) => {
  const response = await api.get<IUserListPageResponse>(
    "/api/CameraAi/user/page",
    {
      params: data,
    }
  );

  return response.data;
};

export const PostCreateUser = async (data: IUserCreateRequest) => {
  const response = await api.post("/api/CameraAi/user/create", data);

  return response.data;
};

export const PostUpdateUser = async (data: IUserUpdateRequest) => {
  const response = await api.post("/api/CameraAi/user/update", data);

  return response.data;
};

export const PostDeleteUser = async (data: { userProfileId: number }) => {
  const response = await api.post("/api/CameraAi/user/delete", data);

  return response.data;
};

export const PostDeleteBatchUser = async (data: { userProfildId: number }) => {
  const response = await api.post("/api/CameraAi/user/batch/delete", data);

  return response.data;
};

export const PostUserDisable = async (data: IUserDisableId) => {
  const response = await api.post("/api/CameraAi/user/disable", data);

  return response.data;
};
