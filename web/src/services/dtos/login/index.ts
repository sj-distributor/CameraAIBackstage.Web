export interface IUserInfo {
  userName: string;
  password: string;
  loginType: LoginTypeEnum;
}

export interface ITeamListProps {
  id: string;
  name: string;
  leaderId: string;
  tenantId: string;
  avatarUrl: string;
  leaderName?: string; // 自定义
}

export enum LoginTypeEnum {
  Self,
  OA,
  OME,
}
