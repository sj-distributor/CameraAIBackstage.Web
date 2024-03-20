import {
  IMonitorSettingIdDto,
  IMonitorSettingRequest,
  IMonitorSettingResponse,
  IMonitorSettingsDto,
  IMonitorTypeResponse,
  IUserListResponse,
} from "@/services/dtos/monitor";
import { IPageDto } from "@/services/dtos/public";
import { api } from "../http-client";

export const GetMonitorType = async () => {
  const response = await api.get<IMonitorTypeResponse[]>(
    "/api/CameraAi/monitor/types"
  );

  return response.data;
};

export const GetMonitorSettingPage = async (data: IMonitorSettingRequest) => {
  const response = await api.get<IMonitorSettingResponse>(
    "/api/CameraAi/monitor/setting/page",
    {
      params: data,
    }
  );

  return response.data;
};

export const MonitorSettingUpdate = async (data: IMonitorSettingsDto) => {
  const response = await api.post("/api/CameraAi/monitor/setting/update", {
    data: data,
  });

  return response.data;
};

export const MonitorSettingCreate = async (data: IMonitorSettingsDto) => {
  const response = await api.post("/api/CameraAi/monitor/setting/create", {
    data: data,
  });

  return response.data;
};

export const MonitorSettingDelete = async (data: IMonitorSettingIdDto) => {
  const response = await api.post("/api/CameraAi/monitor/setting/delete", data);

  return response.data;
};

export const MonitorSettingDisable = async (data: IMonitorSettingIdDto) => {
  const response = await api.post(
    "/api/CameraAi/monitor/setting/disable",
    data
  );

  return response.data;
};

export const MonitorSettingEnable = async (data: IMonitorSettingIdDto) => {
  const response = await api.post("/api/CameraAi/monitor/setting/enable", data);

  return response.data;
};

export const GetUserList = async (data: IPageDto) => {
  const response = await api.get<IUserListResponse>("/api/CameraAi/user/page", {
    params: data,
  });

  return response.data;
};
