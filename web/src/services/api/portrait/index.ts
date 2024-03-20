import {
  ICreateOrUpdatePortrait,
  IDeletePortrait,
  IGetPortraitByParams,
  IPortraitResponse,
} from "@/services/dtos/portrait";

import { api } from "../http-client";

export const getPortraitList = async (params: IGetPortraitByParams) => {
  const response = await api.get<IPortraitResponse>(
    "/api/CameraAi/portrait/page",
    { params }
  );

  return response.data;
};

export const postCreatePortrait = async (params: ICreateOrUpdatePortrait) => {
  await api.post("/api/CameraAi/portrait/create", params);
};

export const postUpdatePortrait = async (params: ICreateOrUpdatePortrait) => {
  await api.post("/api/CameraAi/portrait/update", params);
};

export const postDeletePortrait = async (params: IDeletePortrait) => {
  await api.post("/api/CameraAi/portrait/delete", params);
};
