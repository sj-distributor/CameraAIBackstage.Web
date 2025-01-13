export interface IGetTeamListRequest {
  PageIndex?: number;
  PageSize?: number;
  TeamName?: string;
  BelongCompany?: string;
  Leader?: string;
  LeaderId?: string;
  Phone?: string;
  Keyword?: string;
}

export interface IGetTeamListResponse {
  count: number;
  cameraAiTeams: ICameraAiTeamsProps[];
}

export interface ICameraAiTeamsProps {
  id: string;
  name: string;
  leaderId: string;
  unitId: string;
  avatarUrl: string;
  belongCompany: string;
  leader: string;
  phone: string;
}
