import {
  IEquipmentCreateOrUpdateRequest,
  IEquipmentList,
  IEquipmentPageRequest,
  IEquipmentPageResponse,
  IRegionPageRequest,
  IRegionPageResponse,
} from "@/services/dtos/equipment/list";
import { api } from "../http-client";

export const GetEquipmentPage = async (data: IEquipmentPageRequest) => {
  const response = await api.get<IEquipmentPageResponse>(
    "/api/CameraAi/equipment/page",
    {
      params: data,
    }
  );

  return response.data;
};

export const PostCreateEquipment = async (
  data: IEquipmentCreateOrUpdateRequest
) => {
  const response = await api.post("/api/CameraAi/equipment/create", data);

  return response.data;
};

export const PostUpdateEquipment = async (
  data: IEquipmentCreateOrUpdateRequest
) => {
  const response = await api.post("/api/CameraAi/equipment/update", data);

  return response.data;
};

export const PostDeleteEquipment = async (data: { EquipmentId: number }) => {
  const response = await api.post("/api/CameraAi/equipment/delete", data);

  return response.data;
};

export const GetEquipmentInfoById = async (data: { EquipmentId: number }) => {
  const response = await api.get<IEquipmentList>("/api/CameraAi/equipment", {
    params: data,
  });

  return response.data;
};

export const GetRegionPage = async (data: IRegionPageRequest) => {
  const response = await api.get<IRegionPageResponse>(
    "/api/CameraAi/region/page",
    {
      params: data,
    }
  );

  return response.data;
};
