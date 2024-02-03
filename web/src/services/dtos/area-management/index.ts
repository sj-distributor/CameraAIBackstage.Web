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

export interface ICreateOrUpdateRegionRequest {
  regionAndArea: IRegionsDto;
}

export interface IRegionsDto {
  id?: number;
  areaId?: number;
  areaName?: string;
  regionAddress: string;
  regionAreaNames?: string[];
  principal: string;
  createdTime?: string;
}

export interface IPageDto {
  PageSize: number;
  PageIndex: number;
}
