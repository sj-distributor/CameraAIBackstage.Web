export interface IDataType {
  deviceId: string;
  isOnline: boolean;
  deviceType: string;
  equipmentName: string;
  whetherToBind: boolean;
  operate: string;
}

export interface IDeviceDataType {
  radio: boolean;
  areaId: string;
  areaName: string;
  areaAddress: string;
  person: string;
}
