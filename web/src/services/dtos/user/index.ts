export interface IPageDto {
  PageIndex: number;
  PageSize: number;
}

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
  TeamId?: string;
}

export interface IUserDataItem {
  id: number;
  staffId: string;
  userAccountId?: string;
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
  loading?: boolean;
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

export interface IAddUserRequest {
  teamId: string;
  userProfileIds: string[];
  regionIds: number[];
}
