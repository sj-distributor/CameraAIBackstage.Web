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

export interface IMonitorTypeResponse {
  id: number;
  name: string;
  description: string;
  isDeleted: boolean;
  createdDate: string;
}

export interface IMonitorSettingIdDto {
  settingId: number;
}

export interface IMonitorSettingRequest extends IPageDto {
  IsActive?: boolean;
  MonitorTypeId?: number;
}

export interface IMonitorSettingResponse {
  count: number;
  monitorSettings: IMonitorSettingsDto[];
}

export interface IMonitorSettingsDto {
  id?: number; // 更新填 id
  title: string;
  duration: number;
  notificationContent: string; //通知内容
  broadcastContent?: string; //广播内容
  monitorTypeId: number; //预警类型 id
  monitorTypeName?: string;
  startTime: number;
  endTime: number;
  weekDays: DayOfWeek[];
  equipmentIds: number[];
  monitorNotifications: IMonitorNotificationsDto[];
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: string;
  timeZone: string;
}

export interface IMonitorNotificationsDto {
  recipientIds: number[]; //发送信息的目标
  recipients?: IRecipients[];
  notifyType: CameraAiNotificationType; //发送方式
  notifyTypeName?: string;
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
