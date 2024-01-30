import {
  IEquipmentCreateOrUpdateRequest,
  IEquipmentPageRequest,
  IEquipmentPageResponse,
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
  const response = await api.post("/api/CameraAi/equipment/create", data);

  return response.data;
};

export const PostDeleteEquipment = async (EquipmentId: string) => {
  const response = await api.post(
    "/api/CameraAi/equipment/delete",
    EquipmentId
  );

  return response.data;
};
