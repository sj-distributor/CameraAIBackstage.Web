export interface IGetVehicleMonitorRecordsRequest {
  PageIndex: number;
  PageSize: number;
  EquipmentName?: string;
  EquipmentCodes?: string[];
  MonitorTypeId?: number;
  EndTime?: string;
  StartTime?: string;
  Status?: CameraAiMonitorRecordStatus;
  PlateNumber?: string;
}

export interface IGetVehicleMonitorRecordsResponse {
  count: number;
  records: IVehicleMonitorRecordsItem[];
}

export interface IVehicleMonitorRecordsItem {
  id: number;
  equipmentName: string;
  equipmentCode: string;
  monitorTypeId: number;
  duration: number;
  status: CameraAiMonitorRecordStatus;
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
