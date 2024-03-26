import { DayOfWeek } from "@/services/dtos/monitor";

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

export interface IValidationError {
  name: string[];
  errors: string[];
  errorFields: IValidationError[];
}

export interface ICronListDto {
  title: string;
  value: DayOfWeek;
  isActive: boolean;
}

export interface IOptionsNumberDto {
  label: string;
  value: number;
}

export interface IOptionsStringDto {
  label: string;
  value: string;
}
