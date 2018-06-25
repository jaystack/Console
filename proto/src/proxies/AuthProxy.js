import Proxy from './Proxy';

export default class AuthProxy extends Proxy {

  constructor() {
    super('auth');
  }

  login(credentials) {
    return this.request('post', `${this.endpoint}/login`, credentials);
  }

}
