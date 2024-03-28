import { IPageDto } from "../public";

export enum UserStatus {
  Disable,
  Enable,
}

export enum UserProfileOriginType {
  Off,
  On,
}

export interface IGetUserListRequest extends IPageDto {
  Status?: UserStatus;
  Keyword?: string;
}

export interface IUserDataItem {
  id: number;
  staffId: string;
  name: string;
  department: string;
  group: string;
  position: string;
  positionStatus: string;
  phone: string;
  email: string;
  wechatName: string;
  isQualified: boolean;
  status: UserStatus;
  from: UserProfileOriginType;
  isDeleted: boolean;
  createdTime: string;
}

export interface IGetUserListResponse {
  count: number;
  userProfiles: IUserDataItem[];
}

export interface IUserProfileItem {
  id: number;
  staffId: string;
  name: string;
  department: string;
  group: string;
  position: string;
  positionStatus: string;
  phone: string;
  email: null | string;
  wechatName: string;
  isQualified: boolean;
  status: UserStatus;
  from: UserProfileOriginType;
  isDeleted: boolean;
  createdTime: string;
}
