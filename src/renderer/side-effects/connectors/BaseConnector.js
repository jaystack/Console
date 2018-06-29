import Axios from 'axios';
import { throttleAdapterEnhancer, cacheAdapterEnhancer } from 'axios-extensions';

export default class BaseConnector {
  async init(options, baseURL) {
    this.options = options;
    if (baseURL) {
      this.axios = Axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${options.credentials.token}` },
        adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(Axios.defaults.adapter), {
          threshold: 1000
        })
      });
    }
  }

  queryString(url, object) {
    const string = Object.keys(object).map(
      k => `${encodeURIComponent(k)}=${encodeURIComponent(object[k])}`
    ).join('&');
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
          reject(err)
        })
    );
  }
}
