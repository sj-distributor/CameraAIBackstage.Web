import { IFoundationDetail } from "@/pages/user/user-permissions/tranfer-tree/hook";

export enum HierarchyDepthEnum {
  Department,
  Corporation,
  Group,
}

export enum HierarchyStaffRangeEnum {
  AllStaff,
  AllTeamLeader,
}

export interface IFoundationResponse {
  staffDepartmentHierarchy: IFoundationDetail[];
}

export enum HierarchyStaffIdSourceEnum {
  StringStaffId,
  IntegerStaffId,
}
