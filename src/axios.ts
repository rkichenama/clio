/* istanbul ignore file */
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const defaultTransform = (data: any) => data;

export default (baseURL: string, {
  transform = defaultTransform,
  headers = {}
} = {} as {
  transform?: (json: any) => any,
  headers?: any
}) => {
  const api = Axios.create({ baseURL, headers });

  api.interceptors.response.use((response: AxiosResponse) => {
    if (response.data && /^application\/json/.test(response.headers['content-type'])) {
      response.data = transform(camelizeKeys(response.data));
    }
    return response;
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const newConfig = { ...config };
    if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
      return newConfig;
    }
    if (config.params) { newConfig.params = decamelizeKeys(config.params); }
    if (config.data) { newConfig.data = decamelizeKeys(config.data); }
    return newConfig;
  });

  return api;
};
