'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readConfig = undefined;

var _path = require('path');

var _fsExtra = require('fs-extra');

const { remote: { app } } = require('electron');

const defaultConfig = {
  sources: [{
    type: 'slack',
    credentials: {},
    account: {},
    channels: [{ name: 'console' }]
  }, {
    type: 'github',
    credentials: {},
    account: {},
    repos: [{ name: 'Console' }]
  }]
};

const readConfig = exports.readConfig = async () => {
  const dirPath = (0, _path.join)(app.getPath('home'), '.console');
  const filePath = (0, _path.join)(dirPath, 'config.json');
  await (0, _fsExtra.ensureDir)(dirPath);
  const alreadyExists = await (0, _fsExtra.exists)(filePath);
  if (!alreadyExists) {
    await (0, _fsExtra.writeFile)(filePath, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }
  const content = (await (0, _fsExtra.readFile)(filePath)).toString();
  return JSON.parse(content);
};