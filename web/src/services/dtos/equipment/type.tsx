export interface IEquipmentTypeList extends IEquipmentTypeCreateOrUpdateDto {
  code: string;
  createdTime: string;
  id: number;
  isDeleted: boolean;
}

export interface IEquipmentTypeRequest {
  count: number;
  equipmentTypes: IEquipmentTypeList[];
}

export interface IEquipmentTypeCreateOrUpdateRequest {
  equipmentType: IEquipmentTypeCreateOrUpdateDto;
}

export enum CameraAiEquipmentTypeLabel {
  Camera, // 监测设备
  Sound, // 声音设备
  Lighting, // 灯光设备
}

export interface IEquipmentTypeCreateOrUpdateDto {
  name: string;
  description: string;
  id?: number;
  label: CameraAiEquipmentTypeLabel;
  teamId?: string;
}
