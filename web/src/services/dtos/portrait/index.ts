export interface IFaceDto {
  faceId?: string;
  image: string | null;
  imageUrl?: string;
  isDeleted?: boolean;
}

export interface IPortraitDto {
  id?: number;
  name: string;
  department: string;
  group: string;
  position: string;
  phone: string;
  isQualified: boolean;
  faces: IFaceDto[];
  createdTime?: string;
  teamId?: string;
}

export interface IPortraitResponse {
  count: number;
  portraits: IPortraitDto[];
}

export interface ICreateOrUpdatePortraitDto {
  portrait: IPortraitDto;
}

export interface IDeletePortrait {
  portraitId: number;
}

export interface IGetPortraitByParams {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  TeamId?: string;
}

export interface IPreviewImageDto {
  previewOpen: boolean;
  previewImage: string;
}

export enum OperationTypeEnum {
  Add,
  Edit,
}

export interface IPortraitModal {
  isOpen: boolean;
  operationType: OperationTypeEnum;
  item: IPortraitDto;
}
