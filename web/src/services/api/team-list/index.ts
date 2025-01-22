import {
  IGetTeamListRequest,
  IGetTeamListResponse,
  IGetUserNotificationRequest,
  IGetUserNotificationResponse,
  IPostUpdateUserProps,
} from "@/services/dtos/team-list";

import { api } from "../http-client";

// 超管：获取所有团队
export const GetTeamPageApi = async (data: IGetTeamListRequest) => {
  const response = await api.get<IGetTeamListResponse>(
    "/api/CameraAi/team/page",
    { params: data }
  );

  return response.data;
};

export const GetUserNotificationApi = async (
  data: IGetUserNotificationRequest
) => {
  const response = await api.get<IGetUserNotificationResponse>(
    "/api/CameraAi/team/user/notification",
    { params: data }
  );

  return response.data;
};

export const PostUserUpdateApi = async (data: IPostUpdateUserProps) => {
  const response = await api.post("/api/CameraAi/team/user/update", data);

  return response.data;
};
