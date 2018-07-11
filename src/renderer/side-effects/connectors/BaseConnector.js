import Axios from 'axios';

export default class BaseConnector {
  constructor(db) {
    this.db = db;
  }

  async init(options) {
    this.options = options;
  }

  static queryString(url, object) {
    const string = Object.keys(object).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(object[k])}`).join('&');
    return `${url}?${string}`;
  }

  static async request(token, method, url, { query = {}, data = null } = {}) {
    return await Axios({
      headers: { Authorization: `Bearer ${token}` },
      method,
      url: `${this.baseUrl}/${url}`,
      data,
      params: query
    }).then(resp => resp.data);
  }

  request(...args) {
    return this.constructor.request(this.options.credentials.token, ...args);
  }
}
