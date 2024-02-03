import { Dispatch, SetStateAction } from "react";

import { IRegionsDto } from "@/services/dtos/area-management";

export interface IAreaManagementData {
  areaId: number;
  areaName: string;
  areaAddress: string;
  person: string;
}

export interface IAddAreaModalProps {
  setOperateModalParams: Dispatch<SetStateAction<IModifyModalDto>>;
  operateModalParams: IModifyModalDto;
  initGetRegionList: () => void;
}

export interface IModifyModalDto {
  isOpen: boolean;
  isEdit: boolean;
  recordItem: IRegionsDto;
}
