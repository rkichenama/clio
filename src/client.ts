/* istanbul ignore file */
import { AxiosResponse } from 'axios';
import Axios from './axios';

// const pullLimitsFromHeaders = (response: AxiosResponse<ApiSuccess>) => {
//   console.log(response)
//   const { limit, remaining, reset: resetAt } = [
//     'x-ratelimit-limit',
//     'x-ratelimit-remaining',
//     'x-ratelimit-reset',
//   ].reduce((apiLimits, key) => ({
//     ...apiLimits,
//     [key.replace(/x-ratelimit-/, '')]: Number(response.headers[key])
//   }), {} as any);
//   const detail = { limit, remaining, resetAt };
//   window.dispatchEvent(
//     new CustomEvent('themuse-limit-update', { bubbles: false, detail })
//   );
//   return response;
// };

const baseUrl = 'https://www.themuse.com/api/public/';
const axios = () => {
  const token = JSON.parse(localStorage.getItem('themuse.token'));
  if (token) {
    // TODO register app for api access?
    const headers = {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return Axios(baseUrl, { headers });
  } else {
    return Axios(baseUrl, { headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    } });
  }
}
export default (params: Query) => {
  const paramsToQuery = Object.entries(params)
    .reduce((qry, [ key, values ]) => {
      if (Array.isArray(values) && values.length) {
        qry += `&${values.map(value => `${key}=${value}`).join('&')}`;
      } else if (key === 'page') {
        qry += `&page=${values}`
      }
      return qry;
    }, '');
  return axios()({
    method: 'GET',
    url: `jobs?${paramsToQuery.slice(1)}`
  });
}
// .then(pullLimitsFromHeaders);
