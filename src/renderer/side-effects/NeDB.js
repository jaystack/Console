import NeDB from 'nedb';
import {join} from "path";
import { remote } from 'electron';
import fs from 'fs';

const exists = path => fs.existsSync(path);
export const homeDir = join(remote.app.getPath('home'), '.console');
export const dbName = name => join(homeDir,`db/${name}.db`);

if (!exists(join(homeDir,'db'))) {
  fs.mkdirSync(join(homeDir,'db'))
}

export default class DbManager {
  static instance;

  constructor() {
    if (this.constructor.instance) return this.constructor.instance;
    this.dbs = {};
    this.createStores();
    this.constructor.instance = this;
  }

  createStores() {
    this.dbs.slack = { conversations: new NeDB({ filename: dbName('slack.conversations') }) };
  }
}
