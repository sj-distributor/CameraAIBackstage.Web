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
