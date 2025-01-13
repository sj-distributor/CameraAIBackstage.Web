import {
  IGetTeamListRequest,
  IGetTeamListResponse,
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
