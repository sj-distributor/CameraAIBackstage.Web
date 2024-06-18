import { IPageDto } from "../public";

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum CameraAiNotificationType {
  Email,
  WorkWechat,
  Sms,
  PhoneCall,
}

export enum CameraAiMonitorType {
  People, // 識別人員
  Vehicles, // 識別車輛
  AbnormalVehicles, // 識別異常車輛
  Security = 6, // 防盜
  All = -1,
}

export interface IMonitorSettingIdDto {
  settingId: number;
}

export interface IMonitorSettingRequest extends IPageDto {
  IsActive?: boolean;
  MonitorType?: CameraAiMonitorType[];
}

export interface IMonitorSettingResponse {
  count: number;
  monitorSettings: IMonitorSettingsDto[];
}

export interface IMonitorSettingsPublicDto {
  id?: number; // 更新填 id
  title: string;
  duration: number | null;
  timeInterval: number | null;
  notificationContent: string; // 通知内容
  broadcastContent?: string | null; // 广播内容
  monitorTypes: CameraAiMonitorType[]; // 预警类型 id
  startTime: number | null;
  endTime: number | null;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: string;
}

export interface IMonitorSettingsDto extends IMonitorSettingsPublicDto {
  weekDays: DayOfWeek[];
  equipmentIds: number[];
  monitorNotifications: IMonitorNotificationsDto[];
  timeZone: string;
  loading?: boolean; // 自定义
  monitorTypeNames?: string[];
}

export interface IMonitorNotificationsDto {
  recipientIds: string[];
  recipients: IRecipientsDto[];
  notifyType: CameraAiNotificationType;
  notifyTypeName?: string;
}

export interface IRecipientsDto {
  staffId: string;
  name?: string;
}

export interface IRecipients {
  id: number;
  createdOn: string;
  modifiedOn: string;
  uuid: string;
  userName: string;
  isActive: boolean;
  thirdPartyUserId: string;
  issuer: number;
  roles: IRolesDto[];
  permissions: IPermissionsDto[];
  userAccountProfile: {
    id: number;
    userAccountId: number;
    createdDate: string;
    displayName: string;
    phone: string;
    email: string;
  };
}

export interface IRolesDto {
  id: number;
  createdDate: string;
  modifiedDate: string;
  name: string;
  displayName: string;
  description: string;
}

export interface IPermissionsDto {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  displayName: string;
  description: string;
  isSystem: boolean;
}

export interface IUserListResponse {
  count: number;
  userProfiles: IUserProfiles[];
}

export enum CameraAiUserProfileStatus {
  Enabled,
  Disabled,
}

export enum CameraAiUserProfileOriginType {
  Original,
  Foundation,
}

export interface IUserProfiles {
  id: number;
  staffId: string;
  name: string;
  department: string;
  group: string;
  position: string;
  positionStatus: string;
  phone: string;
  email: string;
  avatar: string;
  status: CameraAiUserProfileStatus;
  from: CameraAiUserProfileOriginType;
  isDeleted: boolean;
  createdTime: string;
}
