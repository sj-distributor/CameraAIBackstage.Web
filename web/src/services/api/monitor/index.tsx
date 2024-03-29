import {
  IMonitorSettingIdDto,
  IMonitorSettingRequest,
  IMonitorSettingResponse,
  IMonitorSettingsDto,
  IUserListResponse,
} from "@/services/dtos/monitor";
import { IPageDto } from "@/services/dtos/public";

import { api } from "../http-client";

export const GetMonitorSettingPage = async (data: IMonitorSettingRequest) => {
  const MonitorTypesValues = data.MonitorType?.map(
    (value) => `MonitorTypes=${value}`
  ).join("&");

  const response = await api.get<IMonitorSettingResponse>(
    `/api/CameraAi/monitor/setting/page?PageSize=${data.PageSize}&PageIndex=${
      data.PageIndex
    }${data.IsActive !== undefined ? `&IsActive=${data.IsActive}` : ""}${
      data.MonitorType ? `&${MonitorTypesValues}` : ""
    }`
  );

  return response.data;
};

export const GetMonitorSettingDetail = async (data: IMonitorSettingIdDto) => {
  const response = await api.get<IMonitorSettingsDto>(
    "/api/CameraAi/monitor/setting/detail",
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
