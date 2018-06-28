import BaseConnector from './BaseConnector';
import DbManager from '../NeDB';
import { GithubRepoTransformer } from '../../transformers/GithubTransformers';

const db = new DbManager();

export default class GithubConnector extends BaseConnector {
  async init(options) {
    await super.init(options, ' https://api.github.com/');
    this.fetchRepos('jaystack');
  }

  fetchRepos(user) {
    this.request('get', `users/${user}/repos`)
      .then((resp) => db.dbs.github.repos.upsertAll(resp.map(GithubRepoTransformer))
        .then(() => db.dbs.github.repos.find()
          .then((res => console.log('TOTAL GITHUB REPOS', res)))
          .catch(e => console.error(e)))
        .catch(err => console.error(err)))
      .catch(err => console.error(err));
  }
}
