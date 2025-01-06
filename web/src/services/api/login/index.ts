import { ITeamListProps } from "@/services/dtos/login";
import { IUserDataItem } from "@/services/dtos/user";

import { api } from "../http-client";

export const Login = async (data: { userName: string; password: string }) => {
  const response = await api.post<string>("/auth/login", data);

  return response.data;
};

export const GetTeamsMineApi = async (data: object) => {
  const response = await api.get<ITeamListProps[]>(
    "/api/CameraAi/teams/mine",
    data
  );

  return response.data;
};

export const GetAccountInfoApi = async (data: object) => {
  const response = await api.get<{ userProfile: IUserDataItem }>(
    "/api/CameraAi/user/mine",
    data
  );

  return response.data;
};
