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

export interface IMonitorOptionDto {
  label: string;
  value: CameraAiMonitorType;
}

export enum IWarningType {
  People,
  Vehicles,
  Element,
}

export const IWarningTypeLabel = {
  [IWarningType.People]: "人员",
  [IWarningType.Vehicles]: "车辆",
  [IWarningType.Element]: "物体",
};

export interface IMonitorType {
  type: IWarningType;
  children: IMonitorOptionDto[];
}
