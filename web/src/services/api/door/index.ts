import { IPaginationDtoProps } from "@/pages/system/door/props";
import {
  IAddDoorParams,
  IGetDoorListProps,
  IRegionListResponse,
} from "@/services/dtos/access-management";

import { api } from "../http-client";

export const GetRegionCameraList = async (data: { TeamId: string }) => {
  const response = await api.get<IRegionListResponse>(
    "/api/CameraAi/region/camera/page",
    { params: data }
  );

  return response.data;
};

export const GetDoorListApi = async (data: IPaginationDtoProps) => {
  const response = await api.get<IGetDoorListProps>("/api/CameraAi/door/list", {
    params: data,
  });

  return response.data;
};

export const AddDoorApi = async (data: IAddDoorParams) => {
  const response = await api.post("/api/CameraAi/door/add", data);

  return response.data;
};

export const DeleteDoorApi = async (data: { doorId: string }) => {
  const response = await api.post("/api/CameraAi/door/delete", data);

  return response.data;
};

export const UpdateDoorApi = async (data: IAddDoorParams) => {
  const response = await api.post("/api/CameraAi/door/update", data);

  return response.data;
};
