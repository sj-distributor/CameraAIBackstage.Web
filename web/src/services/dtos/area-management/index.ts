import { IPageDto } from "../public";

export interface IAreaManagementRegionRequest {
  RegionId: number;
  AreaId: number;
}

export interface IAreaManagementPageRequest extends IPageDto {
  RegionId?: string;
  RegionAddress?: string;
  Keyword?: string;
  IsFilter?: boolean;
  TeamId?: string;
}

export interface IAreaManagementPageResponse {
  count: number;
  regions: IRegionsDto[];
}

export interface ICreateOrUpdateRegionRequest {
  teamId?: string;
  regionAndArea: IRegionsDto;
}

export interface IRegionsDto {
  id?: number;
  areaId?: number;
  areaName?: string;
  regionAddress: string;
  areaNames?: string[];
  principal: string;
  createdTime?: string;
  locationId: string;
  teamId?: string;
}
