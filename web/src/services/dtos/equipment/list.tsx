export interface IEquipmentPageRequest extends IPageDto {
  IsOnline?: boolean;
  IsBind?: boolean;
  SearchKey?: string; //未定
}

export interface IPageDto {
  PageSize: number;
  PageIndex: number;
}

export interface IEquipmentPageResponse {
  count: number;
  equipments: IEquipmentList[];
}

export interface IEquipmentList extends IEquipmentCreateOrUpdateDto {
  areaId: number;
  createdTime: string;
  equipmentType: string;
  id: number;
  isBind: boolean;
  isDeleted: boolean;
  isOnline: boolean;
  liveStreaming: string;
}

export interface IEquipmentCreateOrUpdateRequest {
  equipment: IEquipmentCreateOrUpdateDto;
}

export interface IEquipmentCreateOrUpdateDto {
  equipmentCode: string;
  equipmentName: string;
  equipmentTypeId: number;
  id?: number;
}
