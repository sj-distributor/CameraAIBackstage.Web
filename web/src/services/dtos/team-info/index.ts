export interface IUpdateTeamProps {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface IGetAttachUrlProps {
  fileUrl: string;
  fileName: string;
  originFileName: string;
  id?: number;
  uuid?: string;
  createDate?: string;
  fileSize?: number;
  filePath?: string;
  title?: string;
}

export interface IPostHandOverProps {
  teamId: string;
  userProfileId: string;
}
