import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import qs from 'qs';

import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';
import { BASE_URL } from "@/constants";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params: any) =>
    qs.stringify(params, {
      encode: false,
      arrayFormat: 'brackets',
    })
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
