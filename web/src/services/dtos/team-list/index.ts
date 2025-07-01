export interface IGetTeamListRequest {
  PageIndex?: number;
  PageSize?: number;
  TeamName?: string;
  BelongCompany?: string;
  Leader?: string;
  LeaderId?: string;
  Phone?: string;
  Keyword?: string;
}

export interface IGetTeamListResponse {
  count: number;
  cameraAiTeams: ICameraAiTeamsProps[];
}

export interface ICameraAiTeamsProps {
  id: string;
  name: string;
  leaderId: string;
  unitId: string;
  avatarUrl: string;
  belongCompany: string;
  leader: string;
  phone: string;
}

export interface IGetUserNotificationRequest {
  UserProfileId?: string;
  TeamId: string;
}

export enum UserStatus {
  Disable,
  Enable,
}

export interface IGetUserNotificationResponse {
  userProfileDto: { status: UserStatus };
  userProfileNotificationDto: IUserProfileNotificationDto;
  cameraAiEquipmentVisibleRangesDto: ICameraAiEquipmentVisibleRangesDto[];
}

export interface IUserProfileNotificationDto {
  id: string;
  email: string;
  phone: string;
  workWechat: string;
}

export interface ICameraAiEquipmentVisibleRangesDto {
  id: string;
  areaId: number;
  teamUserId: string;
}

export interface IPostUpdateUserProps {
  teamId: string;
  userProfileId: string;
  status: UserStatus;
  areaIds: number[];
  userProfileNotificationDto: IUserProfileNotificationDto;
}
