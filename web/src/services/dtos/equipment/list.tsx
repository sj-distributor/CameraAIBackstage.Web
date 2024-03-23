export interface IEquipmentPageRequest extends IPageDto {
  IsOnline?: boolean;
  IsBind?: boolean;
  Keyword?: string;
}

export interface IPageDto {
  PageSize?: number;
  PageIndex?: number;
}

export interface IEquipmentPageResponse {
  count: number;
  equipments: IEquipmentList[];
}

export interface IEquipmentList extends IEquipmentCreateOrUpdateDto {
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
  equipmentCode?: string;
  equipmentName?: string;
  equipmentTypeId?: number | null;
  id?: number;
  areaId?: number;
}

export interface IRegionPageResponse {
  count: number;
  regions: IRegionDto[];
}

export interface IRegionDto {
  id: number;
  areaId: number;
  areaName: string;
  regionAddress: string;
  regionAreaNames: string[];
  principal: string;
  createdTime: string;
  radio?: boolean; // 自定义
}

export interface IEquipmentBindDto {
  binding: IBindDto;
}

export interface IBindDto {
  equipmentId: number;
  areaId?: number; // 绑定的时候传，解绑不传
}
