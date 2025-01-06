import {
  HierarchyDepthEnum,
  HierarchyStaffIdSourceEnum,
  HierarchyStaffRangeEnum,
  IFoundationResponse,
} from "@/services/dtos/tree";

import { api } from "../http-client";

export const GetFoundationData = async (
  type: string,
  data: HierarchyDepthEnum | HierarchyStaffRangeEnum,
  staffIdSource: HierarchyStaffIdSourceEnum
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

// export const GetTreeData = async (
//   type: string,
//   data: HierarchyDepthEnum | HierarchyStaffRangeEnum
// ) => {
//   const response = await api.get<IFoundationResponse>(
//     `/api/CameraAi/user/hierarchy/tree?${
//       type === "HierarchyStaffRange"
//         ? `HierarchyDepth=${HierarchyDepthEnum.Group}&` + type + "=" + data
//         : type + "=" + data
//     }`
//   );

//   return response.data;
// };

export const GetTreeData = async (data: {
  HierarchyDepth: HierarchyDepthEnum;
}) => {
  const response = await api.get<IFoundationResponse>(
    "/api/CameraAi/user/hierarchy/tree",
    {
      params: data,
    }
  );

  return response.data;
};
