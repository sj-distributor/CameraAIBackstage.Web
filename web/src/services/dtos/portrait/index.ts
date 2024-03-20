export interface IFaceDto {
  faceId?: string;
  image: string;
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
}

export interface IPortraitResponse {
  count: number;
  portraits: IPortraitDto[];
}

export interface ICreateOrUpdatePortrait {
  portrait: IPortraitDto;
}

export interface IDeletePortrait {
  portraitId: number;
}

export interface IGetPortraitByParams {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
}

export interface IPreviewImageDto {
  previewOpen: boolean;
  previewImage: string;
  previewTitle: string;
}

export enum operationTypeEnum {
  Add,
  Edit,
}
