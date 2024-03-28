import {
  HierarchyDepthEnum,
  HierarchyStaffRangeEnum,
  IFoundationResponse,
} from "@/services/dtos/tree";

import { api } from "../http-client";

export const GetFoundationData = async (
  type: string,
  data: HierarchyDepthEnum | HierarchyStaffRangeEnum,
  staffIdSource: number
) => {
  const response = await api.get<IFoundationResponse>(
    `/api/HappyScore/department/staff/hierarchy/tree?StaffIdSource=${staffIdSource}&${
      type === "HierarchyStaffRange"
        ? `HierarchyDepth=${HierarchyDepthEnum.Group}&` + type + "=" + data
        : type + "=" + data
    }`
  );

  return response.data;
};
