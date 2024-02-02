import {
  IEquipmentBindDto,
  IEquipmentCreateOrUpdateRequest,
  IEquipmentList,
  IEquipmentPageRequest,
  IEquipmentPageResponse,
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

export const GetRegionPage = async () => {
  const response = await api.get<IRegionPageResponse>(
    "/api/CameraAi/region/page"
  );

  return response.data;
};

export const PostEquipmentBind = async (data: IEquipmentBindDto) => {
  const response = await api.post<IEquipmentList>(
    "/api/CameraAi/equipment/bind",
    data
  );

  return response.data;
};

export const PostEquipmentUnBind = async (data: IEquipmentBindDto) => {
  const response = await api.post<IEquipmentList>(
    "/api/CameraAi/equipment/unbind",
    data
  );

  return response.data;
};
