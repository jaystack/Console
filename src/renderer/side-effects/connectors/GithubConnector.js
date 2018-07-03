import BaseConnector from './BaseConnector';
import DbManager from '../NeDB';
import {
  GithubCommitTransformer,
  GithubRepoTransformer,
  GithubUserTransformer,
} from '../../utils/GithubTransformers';

const db = new DbManager();

export default class GithubConnector extends BaseConnector {
  async init(options) {
    await super.init(options, ' https://api.github.com/');
    const repos = await this.fetchRepos('jaystack');
    const commits = await Promise.all(repos.map(repo => this.fetchCommits(repo)));
    // const users = await this.fetchUsers(commits);
    return { repos };
  }

  async fetchRepos(user) {
    const resp = await this.request('get', `users/${user}/repos`);
    await db.select('github.repos').upsertAll(resp.map(GithubRepoTransformer));
    const res = await db.select('github.repos').find();
    return res;
  }

  async fetchUsers(user) {
    const resp = await this.request('get', `users/${user}/repos`);
    await db.select('github.repos').upsertAll(resp.map(GithubRepoTransformer));
    const res = await db.select('github.repos').find();
    return res;
  }

  async fetchCommits(repo) {
    const lastRecord = await db.select('github.commits').lastRecord();
    if (lastRecord) {
      await this.refreshCommits(repo, lastRecord);
    } else {
      const now = new Date();
      const resp = await this.request('get', this.queryString(`repos/${repo.name}/commits`,{
        since: now.toISOString(),
      }));
      await db.select('github.commits').insertManyIfNone(
        resp.map(commit => ({...GithubCommitTransformer(commit), repo_id: repo.id}))
      );
    }
    const res = await db.select('github.commits').find();
    return res;
  }

  async fetchMe() {
    const resp = await this.request('get', `user`);
    await db.select('github.users').upsert(GithubUserTransformer(resp));
    const res = await db.select('github.users').findOne(resp);
    return res;
  }

  async insertCommits(commits, repo_id) {
    await db.select('github.commits').insert(commits.map(el => ({ ...GithubCommitTransformer(el), repo_id })));
  }

  async refreshCommits(repo, lastRecord) {
    const commits = await this.request('get', this.queryString(`repos/${repo.name}/commits`, {
        since: lastRecord.created
      })
    );
    await this.insertCommits(
      commits.filter(el => el.id !== lastRecord.id),
      repo.id,
    );
  }
}
