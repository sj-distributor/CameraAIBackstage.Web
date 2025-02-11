import {
  HierarchyDepthEnum,
  HierarchyStaffIdSourceEnum,
  IFoundationResponse,
} from "@/services/dtos/tree";

import { api } from "../http-client";

// 大后台添加用户用的树
export const GetFoundationData = async (data: {
  StaffIdSource: HierarchyStaffIdSourceEnum;
  HierarchyDepth: HierarchyDepthEnum;
}) => {
  const response = await api.get<IFoundationResponse>(
    "/api/Foundation/department/staff/hierarchy/tree",
    {
      params: data,
    }
  );

  return response.data;
};

// 普通后台添加用户用的树
export const GetTreeData = async (data: {
  HierarchyDepth?: HierarchyDepthEnum;
  StaffIdSource?: HierarchyStaffIdSourceEnum;
}) => {
  const response = await api.get<IFoundationResponse>(
    "/api/CameraAi/user/hierarchy/tree",
    {
      params: data,
    }
  );

  return response.data;
};
