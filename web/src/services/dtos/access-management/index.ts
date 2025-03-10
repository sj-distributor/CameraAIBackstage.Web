import { DoorType } from "@/pages/system/door/props";

export interface IRegionListResponse {
  count: number;
  regionCameras: IRegionItem[];
}

export interface IRegionItem {
  id: number;
  locationId: string;
  regionAddress: string;
  principal: string;
  isDeleted: boolean;
  createdTime: string;
  cameras: ICameraItem[];
}

export interface ICameraItem {
  id: number;
  equipmentCode: string;
  equipmentTypeId: number;
  isOnline: boolean;
  equipmentTypeName: string;
  label: ICameraAiEquipmentTypeLabel;
  equipmentName: string;
  isBind: boolean;
  areaId: number;
  ipAddress: string;
  brand: string;
  username: string;
  password: string;
  taskId: string;
  areaName: string;
  locationId: string;
  regionAddress: string;
  liveStreaming: string;
  regionId: number;
  previewImg: string;
  isDeleted: boolean;
  status: IPlayBackStatus;
  createdTime: string;
}

export enum ICameraAiEquipmentTypeLabel {
  Camera,
  Sound,
  Lighting,
}

export enum IPlayBackStatus {
  Pending,
  Processing,
  Success,
  Failed,
}

export interface IGetDoorListProps {
  count: number;
  doors: IDoorsItem[];
}

export interface IDoorsItem {
  doorId: string;
  doorName: string;
  doorType: DoorType;
  locationId: string;
  equipmentCode: string;
  orientation: number[][];
  remark: string;
  previewUrl: string;
  totalOpenDuration: number;
  openCount: number;
  createdDate: string;
}

export interface IAddDoorParams {
  doorId: string | undefined;
  doorName: string;
  doorType: DoorType | undefined;
  locationId: string;
  equipmentCode: string;
  remark: string;
  previewUrl: string;
  orientation: number[][]; // 二维数组，表示方向
}
