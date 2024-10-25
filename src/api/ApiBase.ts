import axios, { AxiosResponse } from "axios";
import { Tokens } from "../models/Tokens";
import { AuthErrors } from "../models/Errors";

export const base = `http://${(import.meta as any).env.VITE_BACKEND_ADDR}:${
  (import.meta as any).env.VITE_BACKEND_PORT
}/api`;

export async function get(
  url: string,
  pub: boolean = false,
  headers?: { [key: string]: any } | undefined
): Promise<AxiosResponse<any, any>> {
  if (!pub) {
    if (headers === undefined) {
      headers = {};
    }
    headers["Authorization"] = `Bearer: ${localStorage.getItem(
      Tokens.AccessToken
    )}`;
  }

  const response = await axios.get(url, {
    headers,
    validateStatus: () => true,
  });

  if (!pub && response.data.error === AuthErrors.ExpiredAccessToken) {
    const token_response = await axios.get(`${base}/auth/refresh-tokens`, {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem(Tokens.RefreshToken)}`,
      },
      validateStatus: () => true,
    });
    if (token_response.status >= 200 && token_response.status < 300) {
      localStorage.setItem(
        Tokens.AccessToken,
        `${token_response.data.data[Tokens.AccessToken]}`
      );
      localStorage.setItem(
        Tokens.RefreshToken,
        `${token_response.data.data[Tokens.RefreshToken]}`
      );
      return await get(url, pub, headers);
    }
  }
  return response;
}

export async function post(
  url: string,
  data?: any | undefined,
  pub: boolean = false,
  headers?: { [key: string]: any } | undefined
): Promise<AxiosResponse<any, any>> {
  if (!pub) {
    if (headers === undefined) {
      headers = {};
    }
    headers["Authorization"] = `Bearer: ${localStorage.getItem(
      Tokens.AccessToken
    )}`;
  }

  const response = await axios.post(url, data, {
    headers,
    validateStatus: () => true,
  });

  if (!pub && response.data.error === AuthErrors.ExpiredAccessToken) {
    const token_response = await axios.get(`${base}/auth/refresh-tokens`, {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem(Tokens.RefreshToken)}`,
      },
      validateStatus: () => true,
    });
    if (token_response.status >= 200 && token_response.status < 300) {
      localStorage.setItem(
        Tokens.AccessToken,
        `${token_response.data.data[Tokens.AccessToken]}`
      );
      localStorage.setItem(
        Tokens.RefreshToken,
        `${token_response.data.data[Tokens.RefreshToken]}`
      );
      return await post(url, data, pub, headers);
    }
  }
  return response;
}

export async function del(
  url: string,
  pub: boolean = false,
  headers?: { [key: string]: any } | undefined
): Promise<AxiosResponse<any, any>> {
  if (!pub) {
    if (headers === undefined) {
      headers = {};
    }
    headers["Authorization"] = `Bearer: ${localStorage.getItem(
      Tokens.AccessToken
    )}`;
  }

  const response = await axios.delete(url, {
    headers,
    validateStatus: () => true,
  });

  if (!pub && response.data.error === AuthErrors.ExpiredAccessToken) {
    const token_response = await axios.get(`${base}/auth/refresh-tokens`, {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem(Tokens.RefreshToken)}`,
      },
      validateStatus: () => true,
    });
    if (token_response.status >= 200 && token_response.status < 300) {
      localStorage.setItem(
        Tokens.AccessToken,
        `${token_response.data.data[Tokens.AccessToken]}`
      );
      localStorage.setItem(
        Tokens.RefreshToken,
        `${token_response.data.data[Tokens.RefreshToken]}`
      );
      return await del(url, pub, headers);
    }
  }
  return response;
}

export async function patch(
  url: string,
  data?: any | undefined,
  pub: boolean = false,
  headers?: { [key: string]: any } | undefined
): Promise<AxiosResponse<any, any>> {
  if (!pub) {
    if (headers === undefined) {
      headers = {};
    }
    headers["Authorization"] = `Bearer: ${localStorage.getItem(
      Tokens.AccessToken
    )}`;
  }

  const response = await axios.patch(url, data, {
    headers,
    validateStatus: () => true,
  });

  if (!pub && response.data.error === AuthErrors.ExpiredAccessToken) {
    const token_response = await axios.get(`${base}/auth/refresh-tokens`, {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem(Tokens.RefreshToken)}`,
      },
      validateStatus: () => true,
    });
    if (token_response.status >= 200 && token_response.status < 300) {
      localStorage.setItem(
        Tokens.AccessToken,
        `${token_response.data.data[Tokens.AccessToken]}`
      );
      localStorage.setItem(
        Tokens.RefreshToken,
        `${token_response.data.data[Tokens.RefreshToken]}`
      );
      return await patch(url, data, pub, headers);
    }
  }
  return response;
}

export async function put(
  url: string,
  data?: any | undefined,
  pub: boolean = false,
  headers?: { [key: string]: any } | undefined
): Promise<AxiosResponse<any, any>> {
  if (!pub) {
    if (headers === undefined) {
      headers = {};
    }
    headers["Authorization"] = `Bearer: ${localStorage.getItem(
      Tokens.AccessToken
    )}`;
  }

  const response = await axios.put(url, data, {
    headers,
    validateStatus: () => true,
  });

  if (!pub && response.data.error === AuthErrors.ExpiredAccessToken) {
    const token_response = await axios.get(`${base}/auth/refresh-tokens`, {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem(Tokens.RefreshToken)}`,
      },
      validateStatus: () => true,
    });
    if (token_response.status >= 200 && token_response.status < 300) {
      localStorage.setItem(
        Tokens.AccessToken,
        `${token_response.data.data[Tokens.AccessToken]}`
      );
      localStorage.setItem(
        Tokens.RefreshToken,
        `${token_response.data.data[Tokens.RefreshToken]}`
      );
      return await put(url, data, pub, headers);
    }
  }
  return response;
}
