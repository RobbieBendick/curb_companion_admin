import { AxiosResponse } from "axios";
import { base, get } from "./ApiBase";

const baseUrl: string = `${base}/auth`;

export async function authorize(): Promise<AxiosResponse<any, any>> {
  return await get(`${baseUrl}/authorize-new`, false);
}
