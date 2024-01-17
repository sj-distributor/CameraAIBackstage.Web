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