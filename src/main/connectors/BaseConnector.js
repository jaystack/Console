import axios from 'axios';

export default class BaseConnector {
  constructor(credentials, baseURL, options) {
    this.credentials = credentials;
    this.options = options;
    if (baseURL) {
      this.base = baseURL;
      this.axios = axios.create({baseURL});
    }
  }

}
