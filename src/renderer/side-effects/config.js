import { join } from 'path';
import { ensureDir, exists, writeFile, readFile } from 'fs-extra';
const { remote: { app } } = require('electron');

const defaultConfig = {
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

export const readConfig = async () => {
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
