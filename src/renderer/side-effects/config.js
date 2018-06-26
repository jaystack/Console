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

const getPaths = () => {
  const dirPath = join(app.getPath('home'), '.console');
  const filePath = join(dirPath, 'config.json');
  return { dirPath, filePath };
};

const ensureConfig = async () => {
  const { dirPath, filePath } = getPaths();
  await ensureDir(dirPath);
  const alreadyExists = await exists(filePath);
  if (!alreadyExists) await writeConfig(defaultConfig);
};

export const readConfig = async () => {
  await ensureConfig();
  const { filePath } = getPaths();
  const content = (await readFile(filePath)).toString();
  return JSON.parse(content);
};

export const writeConfig = async config => {
  const { filePath } = getPaths();
  await writeFile(filePath, JSON.stringify(config, null, 2));
};
