export interface ICreateOrUpdatePortrait {
  id?: number;
  name: string;
  department: string;
  group: string;
  position: string;
  phone: string;
  isQualified: boolean;
  faces: [
    {
      faceId?: string;
      image: string;
      imageUrl?: string;
      isDeleted?: boolean;
    }
  ];
  createdTime?: string;
}

export interface IPortraitResponse {
  count: number;
  portraits: ICreateOrUpdatePortrait[];
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
