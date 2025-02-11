export enum AccessTypeEnum {
  SafeDoor = 0,
  RollDoor = 1,
}

export const AccessTypeLabel = {
  [AccessTypeEnum.SafeDoor]: "安全门",
  [AccessTypeEnum.RollDoor]: "卷帘门",
};

export interface IPaginationDtoProps {
  PageIndex: number;
  PageSize: number;
  accessType: AccessTypeEnum | null;
}

export interface IAcccessListProps {
  id: string;
  type: AccessTypeEnum;
  name: string;
  picture: string;
  remark: string;
  createTime: string;
}
