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
        // Access Token was expired
        // if (error.response.status === 400 && !originalConfig._retry) {
        //   originalConfig._retry = true;
        //   const token = sessionStorage.getItem("token");
        //   try {
        //     const rs = await api.post([
        //       `${appUrls.REFRESHTOKEN_URL}?token=${token}`,
        //     ]);
        //     const { access_token } = rs.data;
        //      Cookies.set("token", access_token, {
        //        expires: 7, // Expires in 7 days
        //        secure: true, // Only send over HTTPS
        //        sameSite: "strict", // Protection against CSRF
        //        domain: 'yourdomain.com', // Specify domain if needed
        //      });
        //     return api(originalConfig);
        //   } catch (_error) {
        //     return Promise.reject(_error);
        //   }
        // }
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
