import {
  ICreateOrUpdateRole,
  ICreateRoleUsers,
  IDeleteRoles,
  IDeleteRoleUsers,
  IMinePermissionResponse,
  IPermissionResponse,
  IRequestRoles,
  IRoleByPermissionResponse,
  IRoleIdRequestParams,
  IRolePermissionByRoleIdResponse,
  IUserByRoleIdResponse,
} from "@/services/dtos/user-permission";

import { api } from "../http-client";

// 获取角色列表
export const GetRoles = async (data: IRequestRoles) => {
  const response = await api.get<IRoleByPermissionResponse>(
    "/api/CameraAi/roles/by/permissions",
    {
      params: data,
    }
  );

  return response.data;
};

// 新增角色
export const PostCreateRoles = async (data: ICreateOrUpdateRole) => {
  const response = await api.post(
    "/api/CameraAi/role/permissions/assign",
    data
  );

  return response.data;
};

// 删除角色
export const PostDeleteRoles = async (data: IDeleteRoles) => {
  await api.post("api/Security/roles/delete", data);
};

// 编辑角色
export const PostUpdateRoles = async (data: ICreateOrUpdateRole) => {
  const response = await api.post("/api/Security/role/permissions/edit", data);

  return response.data;
};

// 通过id获取角色权限
export const GetRolePermissionByRoleId = async (roleId: number) => {
  const response = await api.get<IRolePermissionByRoleIdResponse>(
    `/api/Security/role/${roleId}/permissions`
  );

  return response.data;
};

// 获取权限
export const GetPermission = async () => {
  const response = await api.get<IPermissionResponse>(
    "/api/Security/permissions"
  );

  return response.data;
};

// 获取当前账户权限
export const GetCurrentAccountPermission = async (data: { TeamId: string }) => {
  const response = await api.get<IMinePermissionResponse>(
    "/api/CameraAi/mine/roles",
    { params: data }
  );

  return response.data;
};

// 根据角色id获取用户列表
export const GetRolesUserByRoleId = async (data: IRoleIdRequestParams) => {
  const response = await api.get<IUserByRoleIdResponse>(
    "/api/Security/role/users",
    {
      params: data,
    }
  );

  return response.data;
};

// 删除角色中的用户
export const PostDeleteRolesUsers = async (data: IDeleteRoleUsers) => {
  await api.post("api/Security/role/users/delete", data);
};

// 创建角色中的用户
export const PostCreateRolesUsers = async (data: ICreateRoleUsers) => {
  await api.post("/api/Security/role/users/create", data);
};
