import Vue from 'vue';

export default class Proxy {

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  request(type, endpoint, data = null) {
    return new Promise((resolve, reject) => {
      Vue.$http.request(({
        method: type,
        url: endpoint,
        data
      }))
      .then(resp => resolve(resp.data))
      .catch(err => reject(err));
    });
  }

  index() {
    return this.request('get', this.endpoint);
  }

  find(id) {
    return this.request('get', `${this.endpoint}/${id}`);
  }

  destroy(id) {
    return this.request('delete', `${this.endpoint}/${id}`);
  }

  create(obj) {
    return this.request('post', this.endpoint, obj);
  }

  update(id, obj) {
    return this.request('put', `${this.endpoint}/${id}`, obj);
  }

}
