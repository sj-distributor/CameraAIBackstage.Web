import {
  IGetRegisteredVehicleListRequest,
  IGetRegisteredVehicleListResponse,
  IGetVehicleMonitorRecordsRequest,
  IGetVehicleMonitorRecordsResponse,
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
