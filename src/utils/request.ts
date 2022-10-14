import axios, { AxiosRequestConfig } from 'axios';
import { Config } from './environment';

const defaultAxiosConfig = {
  baseURL: Config.PERCENT_API_URL,
  timeout: 1000,
  headers: { Authorization: Config.PERCENT_PUBLISHABLE_API_KEY },
};

const createAxiosRequestObject = (config?: AxiosRequestConfig<any>) =>
  axios.create({ ...defaultAxiosConfig, ...config });

export const request = createAxiosRequestObject();
