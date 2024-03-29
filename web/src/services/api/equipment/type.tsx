import {
  IEquipmentTypeCreateOrUpdateRequest,
  IEquipmentTypeList,
  IEquipmentTypeRequest,
} from "@/services/dtos/equipment/type";
import { IPageDto } from "@/services/dtos/public";

import { api } from "../http-client";

export const GetEquipmentTypePage = async (data: IPageDto) => {
  const response = await api.get<IEquipmentTypeRequest>(
    "/api/CameraAi/equipment/type/page",
    {
      params: data,
    }
  );

  return response.data;
};

export const PostCreateEquipmentType = async (
  data: IEquipmentTypeCreateOrUpdateRequest
) => {
  const response = await api.post("/api/CameraAi/equipment/type/create", data);

  return response.data;
};

export const PostUpdateEquipmentType = async (
  data: IEquipmentTypeCreateOrUpdateRequest
) => {
  const response = await api.post("/api/CameraAi/equipment/type/update", data);

  return response.data;
};

export const PostDeleteEquipmentType = async (data: {
  EquipmentTypeId: number;
}) => {
  const response = await api.post("/api/CameraAi/equipment/type/delete", data);

  return response.data;
};

export const GetEquipmentTypeInfoById = async (data: {
  EquipmentTypeId: number;
}) => {
  const response = await api.get<IEquipmentTypeList>(
    "/api/CameraAi/equipment/type",
    {
      params: data,
    }
  );

  return response.data;
};
