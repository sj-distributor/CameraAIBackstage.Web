export enum DoorType {
  RollDoor = 0,
  SafeDoor = 1,
}

export const AccessTypeLabel = {
  [DoorType.RollDoor]: "卷帘门",
  [DoorType.SafeDoor]: "安全门",
};

export interface IPaginationDtoProps {
  PageIndex: number;
  PageSize: number;
  Keyword: string;
  DoorType: DoorType | undefined;
  TeamId: string;
}

export interface IAcccessListProps {
  id: string;
  type: DoorType;
  name: string;
  picture: string;
  remark: string;
  createTime: string;
}

export interface IAccessManageParams {
  type: DoorType | null;
  name: string;
  equipment: string;
  previewImg: string;
  mark: string;
}

export interface IDoorsModal {
  type: "add" | "update";
  open: boolean;
}
