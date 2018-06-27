import BaseConnector from './BaseConnector'
import DbManager from "../NeDB";
import {GithubRepoTransformer} from "../../transformers/GithubTransformers";
const db = new DbManager();

export default class GithubConnector extends BaseConnector {
  async init(options) {
    await super.init(options, ' https://api.github.com/');
    this.request('get', 'users/jaystack/repos')
      .then(resp => {
        db.dbs.github.repos.insert(resp.map(GithubRepoTransformer))
          .then(resp => console.log("GITHUB REPOS", resp))
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err));
  }
}
