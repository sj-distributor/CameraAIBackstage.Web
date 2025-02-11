export interface IGetVehicleMonitorRecordsRequest {
  PageIndex: number;
  PageSize: number;
  EndTime?: string;
  StartTime?: string;
  Status?: CameraAiMonitorRecordStatus;
  Name?: string;
  EquipmentName?: string;
  EquipmentCodes?: string[];
  MonitorTypes?: CameraAiMonitorType[];
  TeamId?: string;
}

export interface IGetRegisteredVehicleListRequest {
  PageIndex: number;
  PageSize: number;
  EndTime?: string;
  StartTime?: string;
  Status?: CameraAiMonitorRecordStatus;
  RegisterType?: CameraAiMonitorRegisterType;
  Name?: string;
  TeamId?: string;
}

export interface IPostRegisteringCarRequest {
  recordId: string;
  recordStatus?: CameraAiMonitorRecordStatus;
  exceptionReason?: string;
}

export interface IPostEditRegisterCarRequest {
  recordRegister: IRegisteredVehicleListItem;
}

export interface IGetVehicleMonitorRecordsResponse {
  count: number;
  records: IVehicleMonitorRecordsItem[];
}

export interface IGetRegisteredVehicleListResponse {
  count: number;
  registers: IRegisteredVehicleListItem[];
}

export interface IGetWarningDemandResponse {
  record: IWarningRecord;
  regionAndArea: IWarningRegionAndArea;
}

export interface IWarningRecord {
  id: number;
  correlationId: string;
  equipmentCode: string;
  settingId: number;
  monitorType: CameraAiMonitorType;
  duration: number;
  exceptionReason: string;
  recordStatus: number;
  name: string;
  replayTaskId: string;
  replayUrl: string;
  isRegistered: true;
  licensePlateImageUrl: string;
  occurrenceTime: string;
  createdTime: string;
  playbackStatus: number;
}

export interface IWarningRegionAndArea {
  id: number;
  areaId: number;
  locationId: string;
  areaName: string;
  regionAddress: string;
  areaNames: [string];
  principal: string;
  createdTime: string;
}

export interface IRegisteredVehicleListItem {
  id: number;
  type: CameraAiMonitorRegisterType;
  name: string;
  registeredRecordStatus: CameraAiMonitorRecordStatus;
  createdTime: string;
}

export interface IVehicleMonitorRecordsItem {
  id: number;
  equipmentName: string;
  equipmentCode: string;
  monitorType: CameraAiMonitorType;
  correlationId: string;
  duration: number;
  recordStatus: CameraAiMonitorRecordStatus;
  name: string;
  replayTaskId: string;
  replayUrl: string;
  isRegistered: boolean;
  licensePlateImageUrl: string;
  occurrenceTime: string;
  createdTime: string;
}

export enum CameraAiMonitorRecordStatus {
  Unmarked,
  Verified = 10,
  Exception = 20,
}

export enum CameraAiMonitorRegisterType {
  Car,
  Face,
}

export enum CameraAiMonitorType {
  People, // 識別人員
  Vehicles, // 識別車輛
  AbnormalVehicles, // 識別異常車輛
}

export interface IPlayBackGenerateRequest {
  locationId: string;
  equipmentCode: string;
  startTime: string;
  endTime: string;
  taskId: string;
  monitorTypes: number[];
}

export interface IGeneratePlayBackRequest {
  locationId: string;
  equipmentCode: string;
  startTime: string;
  endTime: string;
  monitorTypes: number[];
}
