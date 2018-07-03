import Axios from 'axios';

export default class BaseConnector {
  constructor(db) {
    this.db = db;
  }

  async init(options, baseURL) {
    this.options = options;
    if (baseURL) {
      this.axios = Axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${options.credentials.token}` }
      });
    }
  }

  queryString(url, object) {
    const string = Object.keys(object).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(object[k])}`).join('&');
    return `${url}?${string}`;
  }

  async fetchDataSince(date) {
    // do some data fetch
  }

  request(method, url, data = null) {
    return new Promise((resolve, reject) =>
      this.axios
        .request({
          method,
          url,
          data
        })
        .then(resp => resolve(resp.data))
        .catch(err => {
          reject(err);
        })
    );
  }
}
