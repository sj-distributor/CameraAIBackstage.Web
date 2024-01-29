import { IPageDto } from "@/services/dtos/equipment/list";
import {
  IEquipmentTypeCreateOrUpdateRequest,
  IEquipmentTypeRequest,
} from "@/services/dtos/equipment/type";
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
  const response = await api.post("/api/CameraAi/equipment/type/create", data);

  return response.data;
};

export const PostDeleteEquipmentType = async (EquipmentTypeId: string) => {
  const response = await api.post(
    "/api/CameraAi/equipment/type/delete",
    EquipmentTypeId
  );

  return response.data;
};
