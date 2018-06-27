import Axios from 'axios';
import DbManager from '../NeDB';

export default class BaseConnector {
  async init(options, baseURL) {
    this.options = options;
    if (baseURL) {
      this.axios = Axios.create({ baseURL });
      this.setAuthorisation(options.credentials.token);
    }
    // do some init method
  }

  async fetchDataSince(date) {
    // do some data fetch
  }

  setAuthorisation(token) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  request(type, url, data = null) {
    return new Promise(
      (resolve, reject) => this.axios.request(
        type,
        url,
        data
      )
      .then(resp => resolve(resp.data))
      .catch(err => reject(err))
    );
  }
}
