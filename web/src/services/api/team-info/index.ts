import {
  IGetAttachUrlProps,
  IPostHandOverProps,
  IUpdateTeamProps,
} from "@/services/dtos/team-info";

import { api } from "../http-client";

// 更新团队信息
export const PostUpdateTeamApi = async (data: { team: IUpdateTeamProps }) => {
  const response = await api.post("/api/CameraAi/team/update", data);

  return response.data;
};

export const PostUploadApi = async (data: FormData) => {
  const response = await api.post<IGetAttachUrlProps>(
    "/api/Attachment/upload",
    data
  );

  return response.data;
};

// 移交团队
export const PostHandOver = async (data: IPostHandOverProps) => {
  const response = await api.post("/api/CameraAi/team/handover", data);

  return response.data;
};
