import { api } from "../http-client";

export const Login = async (data: { userName: string; password: string }) => {
  const response = await api.post<string>("/auth/login", data);

  return response.data;
};
