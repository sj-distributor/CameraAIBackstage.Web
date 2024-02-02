export interface IAreaManagementRegionRequest {
  RegionId: number;
  AreaId: number;
}

export interface IAreaManagementPageRequest extends IPageDto {
  RegionId?: string;
  RegionAddress?: string;
  Keyword?: string;
}

export interface IAreaManagementPageResponse {
  count: number;
  regions: IRegionsDto[];
}

export interface ICreateRegionRequest {
  regionAndArea: ICreateRegionDto;
}

export interface IUpdateRegionRequest {
  regionAndArea: IRegionsDto;
}

export interface IRegionsDto {
  id?: number;
  areaId?: number;
  areaName?: string;
  regionAddress: string;
  regionAreaNames: string[];
  principal: string;
  createdTime?: string;
}

export interface ICreateRegionDto {
  regionAddress: string;
  regionAreaNames: string[];
  principal: string;
  createdTime?: string;
}

export interface IPageDto {
  PageSize: number;
  PageIndex: number;
}
