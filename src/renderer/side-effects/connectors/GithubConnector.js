import BaseConnector from './BaseConnector';
import DbManager from '../NeDB';
import { GithubRepoTransformer } from '../../transformers/GithubTransformers';

const db = new DbManager();

export default class GithubConnector extends BaseConnector {
  async init(options) {
    await super.init(options, ' https://api.github.com/');
    const repos = await this.fetchRepos('jaystack');
    return { repos };
  }

  async fetchRepos(user) {
    const resp = await this.request('get', `users/${user}/repos`);
    await db.select('github.repos').upsertAll(resp.map(GithubRepoTransformer));
    const res = await db.select('github.repos').find();
    return res;
  }
}
