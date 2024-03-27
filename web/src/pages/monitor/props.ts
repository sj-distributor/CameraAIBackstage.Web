import { CameraAiMonitorType } from "@/services/dtos/monitor";

export interface IMonitorDataType {
  title: string;
  condition: boolean;
  warningType: string;
  notificationObject: string;
  operate: string;
}

export enum IOpenOrStopStatus {
  None,
  Enable,
  Deactivate,
}

export enum IWarningType {
  All,
  IdentifyPersonnel,
  IdentifyVehicle,
  UnusualVehicle,
}

export interface IMonitorOptionDto {
  label: string;
  value: CameraAiMonitorType;
}
