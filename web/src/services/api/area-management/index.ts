import {
  IAreaManagementPageRequest,
  IAreaManagementPageResponse,
  IAreaManagementRegionRequest,
  ICreateRegionRequest,
  IRegionsDto,
  IUpdateRegionRequest,
} from "@/services/dtos/area-management";

import { api } from "../http-client";

export const GetAreaManagementRegion = async (
  data: IAreaManagementRegionRequest
) => {
  const response = await api.get<IRegionsDto>("/api/CameraAi/region", {
    params: data,
  });

  return response.data;
};

export const GetAreaManagementPage = async (
  data: IAreaManagementPageRequest
) => {
  const response = await api.get<IAreaManagementPageResponse>(
    "/api/CameraAi/region/page",
    {
      params: data,
    }
  );

  return response.data;
};

export const PostCreateRegion = async (data: ICreateRegionRequest) => {
  const response = await api.post("/api/CameraAi/region/create", data);

  return response.data;
};

export const PostUpdateRegion = async (data: IUpdateRegionRequest) => {
  const response = await api.post("/api/CameraAi/region/update", data);

  return response.data;
};

export const PostDeleteAreaId = async (data: { AreaId: number }) => {
  const response = await api.post("/api/CameraAi/area/delete", data);

  return response.data;
};
