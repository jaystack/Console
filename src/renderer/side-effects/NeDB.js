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
      slack: {
        conversations: createDatabase('slack.conversations'),
        messages: createDatabase('slack.messages'),
      },
      github: {
        repos: createDatabase('github.repos'),
      },
    };
  }

  static createDatabase(name) {
    return new StoreInterface({ filename: dbName(name), autoload: true });
  }

  select(name) {
    const nameParts = name.split('.');
    return this.dbs[nameParts[0]][nameParts[1]];
  }

  static getInstance() {
    return this.instance;
  }
}
