export interface IGetVehicleMonitorRecordsRequest {
  PageIndex: number;
  PageSize: number;
  EndTime?: string;
  StartTime?: string;
  Status?: CameraAiMonitorRecordStatus;
  PlateNumber?: string;
  EquipmentName?: string;
  EquipmentCodes?: string[];
  monitorType?: CameraAiMonitorType;
}

export interface IGetRegisteredVehicleListRequest {
  PageIndex: number;
  PageSize: number;
  EndTime?: string;
  StartTime?: string;
  Status?: CameraAiMonitorRecordStatus;
  RegisterType?: CameraAiMonitorRegisterType;
  PlateNumber?: string;
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
  plateNumber: string;
  faceName: string;
  replayTaskId: string;
  replayUrl: string;
  isRegistered: true;
  licensePlateImageUrl: string;
  occurrenceTime: string;
  createdTime: string;
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
  faceName: string;
  plateNumber: string;
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
  plateNumber: string;
  faceName: string;
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
