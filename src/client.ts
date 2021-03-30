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
export default (params: Query) => axios()(
{
  method: 'GET',
  url: 'jobs',
  params
})
// .then(pullLimitsFromHeaders);
