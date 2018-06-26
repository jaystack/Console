import * as path from "path";
import * as url from "url";
import shortId from "shortid";
import {app, BrowserWindow} from "electron";

export default class WindowManager {

  static instance;

  constructor(app) {
    if (this.constructor.instance) return this.constructor.instance;
    this.collection = [];
    this.app = app;
    this.constructor.instance = this;
  }

  create(options = {}) {

    const id = shortId.generate();
    const that = this;
    const conf = Object.assign({
      id,
      window: {
        width: 1300,
        height: 850,
        webPreferences: {
          nodeIntegrationInWorker: true
        }
      },
      url: url.format({
        pathname: path.join(__dirname, '../../index.html'),
        protocol: 'file:',
        slashes: true
      }),
      dev: false,
      onClose: () => {
        that.remove(id);
        app.quit();
      }
    }, options);

    let win = new BrowserWindow(conf.window);

    win.loadURL(conf.url);
    if (conf.dev) win.webContents.openDevTools();
    win.on('closed', conf.onClose);

    this.collection.push(win);
  }

  all() {
    return this.collection;
  }

  find(id) {
    const obj = this.collection.filter(el => el.id === id);
    return obj[0] ? obj[0] : null
  }

  remove(id) {
    this.collection = this.collection.filter(el => el.id !== id);
  }

  count() {
    return this.collection.length;
  }

}
