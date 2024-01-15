export interface ISelectUserDto {
  name: string;
  notificationTool: NotificationToolType[];
}

export enum NotificationToolType {
  Email,
  EnterpriseWeChat,
  Sms,
  Telephone,
}
