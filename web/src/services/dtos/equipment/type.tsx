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

export interface IEquipmentTypeCreateOrUpdateDto {
  name: string;
  description: string;
  id?: number;
}
