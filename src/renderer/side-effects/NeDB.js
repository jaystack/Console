import { join } from 'path';
import { remote } from 'electron';
import fs from 'fs';
import StoreInterface from '../interfaces/StoreInterface';

const exists = path => fs.existsSync(path);
export const homeDir = join(remote.app.getPath('home'), '.console');
export const dbName = name => join(homeDir, `db/${name}.db`);

if (!exists(join(homeDir, 'db'))) {
  fs.mkdirSync(join(homeDir, 'db'));
}

export default class DbManager {
  static instance;

  constructor() {
    if (this.constructor.instance) return this.constructor.getInstance();
    this.dbs = {};
    this.createStores();
    this.constructor.instance = this;
  }

  createStores() {
    const { createDatabase } = this.constructor;
    this.dbs = {
      projects: createDatabase('projects'),
      accounts: createDatabase('accounts'),
      slack: {
        conversations: createDatabase('slack.conversations'),
        messages: createDatabase('slack.messages'),
        users: createDatabase('slack.users')
      },
      github: {
        commits: createDatabase('github.commits'),
        repos: createDatabase('github.repos'),
        users: createDatabase('github.users')
      }
    };
  }

  static createDatabase(name) {
    return new StoreInterface({ filename: dbName(name), autoload: true });
  }

  select(name) {
    const nameParts = name.split('.');
    return nameParts.reduce((node, name) => node[name], this.dbs);
  }

  static getInstance() {
    return this.instance;
  }
}
