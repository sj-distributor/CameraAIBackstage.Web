import {
  IGetRegisteredVehicleListRequest,
  IGetRegisteredVehicleListResponse,
  IGetVehicleMonitorRecordsRequest,
  IGetVehicleMonitorRecordsResponse,
  IGetWarningDemandResponse,
  IPostEditRegisterCarRequest,
  IPostRegisteringCarRequest,
} from "@/services/dtos/license-plate-management";

import { api } from "../http-client";

export const GetVehicleMonitorRecords = async (
  data: IGetVehicleMonitorRecordsRequest
) => {
  const response = await api.get<IGetVehicleMonitorRecordsResponse>(
    "/api/CameraAi/monitor/records",
    {
      params: data,
    }
  );

  return response.data;
};

export const GetRegisteredVehicleList = async (
  data: IGetRegisteredVehicleListRequest
) => {
  const response = await api.get<IGetRegisteredVehicleListResponse>(
    "/api/CameraAi/monitor/registers",
    {
      params: data,
    }
  );

  return response.data;
};

export const PostRegisteringVehicles = async (
  data: IPostRegisteringCarRequest
) => {
  const response = await api.post(
    "/api/CameraAi/monitor/record/register",
    data
  );

  return response.data;
};

export const GetWarningDemand = async (recordId: string) => {
  const response = await api.get<IGetWarningDemandResponse>(
    "/api/CameraAi/monitor/record/detail",
    {
      params: { RecordId: recordId },
    }
  );

  return response.data;
};

export const PostEditRegisterCar = async (
  data: IPostEditRegisterCarRequest
) => {
  const response = await api.post("/api/CameraAi/monitor/register/edit", data);

  return response.data;
};

export const PostDeleteRegisterCar = async (registerId: string) => {
  const response = await api.post("/api/CameraAi/monitor/register/delete", {
    registerId,
  });

  return response.data;
};
