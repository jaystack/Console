import ConnectorFactory from './ConnectorFactory';
import ConnectorStore from './ConnectorStore';
import { app } from 'electron';
import {ensureDir, exists, readFile, writeFile} from "fs-extra";
import {join} from "path";

export const defaultConfig = {
  sources: [
    {
      type: 'slack',
      credentials: {},
      account: {},
      channels: [{ name: 'console' }]
    },
    {
      type: 'github',
      credentials: {},
      account: {},
      repos: [{ name: 'Console' }]
    }
  ]
};

export default class Bootstrap {
  constructor() {
    this.store = new ConnectorStore();
    this.readConfig()
      .then(resp => {
          this.config = resp;
          this.init();
      })
      .catch(err => console.error(err));
  }

  init() {
    this.config.sources.forEach(el => {
      this.store.add(
        ConnectorFactory.make(el.type,el.credentials,el.options)
      )
    });
  }

  async readConfig() {
    const dirPath = join(app.getPath('home'), '.console');
    const filePath = join(dirPath, 'config.json');
    await ensureDir(dirPath);
    const alreadyExists = await exists(filePath);
    if (!alreadyExists) {
      await writeFile(filePath, JSON.stringify(defaultConfig, null, 2));
      return defaultConfig;
    }
    const content = (await readFile(filePath)).toString();
    return JSON.parse(content);
    };
}

