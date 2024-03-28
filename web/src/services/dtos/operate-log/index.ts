import { Dayjs } from "dayjs";
import { IPageDto } from "../public";

export interface IOperateLogsPageRequest extends IPageDto {
  StartTime?: Dayjs | null | string;
  EndTime?: Dayjs | null | string;
  Keyword?: string;
}

export interface IOperateLogsPageResponse {
  count: number;
  logs: ILogsDto[];
}

export interface ILogsDto {
  id: number;
  actionUser: string;
  actionContent: string;
  systemType: number;
  createdTime: string;
}
