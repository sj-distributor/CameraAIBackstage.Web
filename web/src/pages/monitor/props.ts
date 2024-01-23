export interface IMonitorDataType {
  title: string;
  condition: boolean;
  warningType: string;
  notificationObject: string;
  operate: string;
}

export enum IMonitorConfigurationType {
  Add,
  Update,
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
