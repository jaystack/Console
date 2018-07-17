import axios from 'axios';

export default (method, url, { headers = {}, query = {}, body = {} } = {}) =>
  axios({
    method,
    url,
    headers: { ...headers },
    data: body,
    params: query
  });
