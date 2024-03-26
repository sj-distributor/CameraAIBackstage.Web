export interface IRole {
  id?: number;
  createdDate?: string;
  modifiedDate?: string;
  name?: string | undefined;
  displayName?: string | undefined;
  description: string | undefined;
  systemSource?: RoleSystemSourceEnum;
}

interface IRoleUser {
  id?: number;
  roleId?: number;
  userId: number | string;
}

export interface IRolePermissionDetail {
  id?: number;
  roleId?: number;
  permissionId?: number;
  userIds: (number | string)[];
}

export interface IRolePermissionUser {
  id?: number;
  roleId?: number;
  permissionId?: number;
  userIds: (number | string)[];
  createdDate?: string;
  modifiedDate?: string;
}
export interface ICreateOrUpdateRole {
  role: IRole;
  roleUsers: IRoleUser[];
  rolePermissions: IRolePermissionDetail[];
}

export interface IDeleteRoles {
  roleIds: number[];
}

export interface IDeleteRoleUsers {
  roleUserIds: number[];
}

export interface IPermission {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  displayName: string;
  description: string;
  isSystem: boolean;
}

export interface IRolePermissionData {
  role: IRole;
  permissions: IPermission[];
}

export interface IRoleByPermissionResponse {
  count: number;
  rolePermissionData: IRolePermissionData[];
}

export interface IRolePermissionByRoleIdResponse {
  role: IRole;
  roleUsers: IRoleUser[];
  rolePermissionUsers?: IRolePermissionUser[];
  rolePermissions: IRolePermissionDetail[];
}

export interface IPermissionResponse {
  count: number;
  permissions: IPermission[];
}

export interface IMinePermissionResponse {
  count: number;
  rolePermissionData: IRolePermissionData[];
}

export interface IPublicPageParams {
  PageSize: number;
  KeyWord?: string;
  systemSource?: RoleSystemSourceEnum;
}

export interface IRequestRoles extends IPublicPageParams {
  PageIndex: number;
}

export enum RoleSystemSourceEnum {
  System,
  HappyScore,
  CameraAi,
}

export interface IRoleIdRequestParams {
  PageIndex: number;
  PageSize: number;
  KeyWord?: string;
  RoleId?: string;
}

export interface IUserByRoleIdResponse {
  count: number;
  roleUsers: IUserByRoleIdData[];
}

export interface IUserByRoleIdData {
  id: number;
  createdDate: string;
  modifiedDate: string;
  roleId: number;
  userId: number;
  roleName: string;
  userName: boolean;
}
