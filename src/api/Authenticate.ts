import { AxiosResponse } from "axios";
import { LoginRequest } from "../models/Requests";
import { base, get, post } from "./ApiBase";

const baseUrl = `${base}/auth`;

export async function loginBackend(
  loginRequest: LoginRequest
): Promise<AxiosResponse<any, any>> {
  return await post(`${baseUrl}/login-new`, loginRequest, true);
}

export async function refreshTokens(): Promise<AxiosResponse<any, any>> {
  return await get(`${baseUrl}/refresh-tokens`);
}

export async function authorize(): Promise<AxiosResponse<any, any>> {
  return await get(`${baseUrl}/authorize-new`);
}
