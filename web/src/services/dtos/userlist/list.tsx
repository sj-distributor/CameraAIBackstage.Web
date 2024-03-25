export interface IUserLiastPageRequest {
  PageIndex?: number;
  PageSize?: number;
  Status?: CameraAiUserProfileStatus[];
  Keyword?: string;
  IsPortrait?: CameraAiUserProfileOriginType[];
}

export enum CameraAiUserProfileStatus {
  Enabled,
  Disabled,
}

export enum CameraAiUserProfileOriginType {
  Original,
  Foundation,
}

export interface IUserListPageResponse {
  userData(data: any): unknown;
}

export interface IUserCreateRequest {}

export interface IUserUpdateRequest {}

export interface IUserDisableId {
  id?: number;
  name?: string;
  department?: string;
  group?: string;
  postion?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  isDelete?: boolean;
}
