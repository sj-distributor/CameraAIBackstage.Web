import {
  IOperateLogsPageRequest,
  IOperateLogsPageResponse,
} from "@/services/dtos/operate-log";

import { api } from "../http-client";

export const GetOperateLogsPage = async (data: IOperateLogsPageRequest) => {
  const response = await api.get<IOperateLogsPageResponse>(
    "/api/CameraAi/logs",
    {
      params: data,
    }
  );

  return response.data;
};
