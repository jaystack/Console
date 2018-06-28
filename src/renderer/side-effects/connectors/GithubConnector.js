import BaseConnector from './BaseConnector';
import DbManager from '../NeDB';
import { GithubRepoTransformer } from '../../transformers/GithubTransformers';

const db = new DbManager();

export default class GithubConnector extends BaseConnector {
  async init(options) {
    await super.init(options, ' https://api.github.com/');
    this.request('get', 'users/jaystack/repos')
      .then((resp) => {
        db.dbs.github.repos.upsertAll(resp.map(GithubRepoTransformer))
          .then(() => console.log('LOADED GITHUB REPOS'))
          .catch(err => console.error(err));
        db.dbs.github.repos.find()
          .then((res => console.log('TOTAL GITHUB REPOS', res)))
          .catch(e => console.error(e));
      })
      .catch(err => console.error(err));
  }
}
