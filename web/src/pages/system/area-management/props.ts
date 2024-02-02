import { IRegionsDto } from "@/services/dtos/area-management";

export interface IAreaManagementData {
  areaId: number;
  areaName: string;
  areaAddress: string;
  person: string;
}

export interface IAddAreaModalProps {
  record: IRegionsDto;
  isEdit: boolean;
}
