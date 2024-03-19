import {
  IGetVehicleMonitorRecordsRequest,
  IGetVehicleMonitorRecordsResponse,
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
