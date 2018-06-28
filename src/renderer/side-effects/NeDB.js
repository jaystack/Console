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
    if (this.constructor.instance) this.constructor.getInstance();
    this.dbs = {};
    this.createStores();
    this.constructor.instance = this;
  }

  createStores() {
    this.dbs = {
      slack: {
        conversations: this.constructor.createDatabase('slack.conversations'),
      },
      github: {
        repos: this.constructor.createDatabase('github.repos'),
      },
    };
  }

  static createDatabase(name) {
    return new StoreInterface({ filename: dbName(name), autoload: true });
  }

  static getInstance() {
    return this.instance;
  }
}
