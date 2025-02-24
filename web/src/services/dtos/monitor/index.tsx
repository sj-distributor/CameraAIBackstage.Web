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
  Smoke, // 吸烟检测
  Fight, // 打架检测
  Costume, // 安全配备检测
  FluorescentClothing = 501, // 荧光衣
  Gloves = 502, // 手套
  SafetyShoes = 503, // 安全鞋
  Security = 6, // 防盜
  Animal = 7, // 动物
  All = -1,
  Cat = 701,
  Dog = 702,
  Bird = 703,
  Forklift = 8, // 叉车荧光带匹配
  DoorRolling = 9, // 卷帘门
  DoorSafety = 10, // 安全门
  Floor = 11, // 地面检测
  FloorWater = 1101, // 地面水迹
  FloorIce = 1102, // 地面结冰
  TouchGoods = 13, // 触摸二层货物规范
}

export interface IMonitorSettingIdDto {
  settingId: number;
}

export interface IMonitorSettingRequest extends IPageDto {
  IsActive?: boolean;
  MonitorType?: CameraAiMonitorType[];
  TeamId?: string;
}

export interface IMonitorSettingResponse {
  count: number;
  monitorSettings: IMonitorSettingsDto[];
}

export interface IMonitorSettingsPublicDto {
  id?: number; // 更新填 id
  title: string;
  duration?: number | null;
  singleNoticeTime?: number | null;
  metadata?: {
    cameraAiCoordinates: {
      xCoordinate: number;
      yCoordinate: number;
    }[];
  };
  timeInterval?: number | null;
  notificationContent: string; // 通知内容
  broadcastContent?: string | null; // 广播内容
  monitorTypes: CameraAiMonitorType[] | null; // 预警类型 id
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
  teamId?: string;
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
