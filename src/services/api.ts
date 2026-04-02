/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { appUrls } from "./urls";
import { _handleClearCookiesAndSession } from "../utils";

const URL: string = import.meta.env.VITE_BASE_URL;

const apiResource = () => {
  const api = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const internalConfig = config as any;
      internalConfig.headers = internalConfig.headers ?? {};
      const access_token = Cookies.get("access_token");
      const token_type = Cookies.get("token_type");
      if (!access_token) return internalConfig;
      internalConfig.headers["Authorization"] = `${token_type} ${access_token}`;
      return internalConfig;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) =>
      new Promise((resolve) => {
        resolve(response);
      }),
    async (error) => {
      const originalConfig = error.config;
      const status_code = error?.response?.status;
      const _error_code_401 = status_code === 401;
      const _error_code_403 = status_code === 403;
      if (_error_code_403) {
        _handleClearCookiesAndSession();
        window.location.href = "/auth/login";
      } else if (_error_code_401) {
        if (originalConfig.url !== `${appUrls.LOGIN_URL}`) {
          window.location.href = "/auth/login";
          _handleClearCookiesAndSession();
          return;
        }
      } else {
        return new Promise((_, reject) => {
          reject(error?.response);
        });
      }
      return Promise.reject(error?.response);
    }
  );

  return api;
};

export const api = apiResource();
