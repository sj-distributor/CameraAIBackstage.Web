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

export enum TimeType {
  Second,
  Minute,
  Hours,
}

export enum DayOfWeekEnum {
  Monday = "1",
  Tuesday = "2",
  Wednesday = "3",
  Thursday = "4",
  Friday = "5",
  Saturday = "6",
  Sunday = "7",
}

export interface IValidationError {
  name: string[];
  errors: string[];
  errorFields: IValidationError[];
}
