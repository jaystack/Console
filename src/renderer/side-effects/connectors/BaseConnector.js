import Axios from 'axios';

export default class BaseConnector {
  async init(options, baseURL) {
    this.options = options;
    if (baseURL) {
      this.axios = Axios.create({ baseURL });
      this.setAuthorisation(options.credentials.token);
    }
  }

  async fetchDataSince(date) {
    // do some data fetch
  }

  setAuthorisation(token) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  request(method, url, data = null) {
    return new Promise(
      (resolve, reject) => this.axios.request({
        method,
        url,
        data
      })
      .then(resp => resolve(resp.data))
      .catch(err => reject(err))
    );
  }
}
