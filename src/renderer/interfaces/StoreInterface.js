import NeDB from 'nedb';

export default class StoreInterface {
  constructor(options) {
    this.store = new NeDB(options);
  }

  promise(dbFunc, params, paramsIsArray = false, sort) {
    const that = this;
    const options = paramsIsArray ? params : [params];

    return ["find","findOne","count"].includes(dbFunc)
      ? new Promise(
        (resolve, reject) => {
          const cursor = that.store[dbFunc](...options);
          if (sort) cursor.sort(sort);
          cursor.exec((err, res) => {
            if (err) reject(err);
            resolve(res);
          });
        })
      : new Promise(
      (resolve, reject) => {
        that.store[dbFunc](...options, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      });
  }

  cursor(dbFunc, params, paramsIsArray = false) {
    const that = this;
    const options = paramsIsArray ? params : [params];

    return that.store[dbFunc](...options);
  }

  insert(doc) {
    return this.promise('insert', doc);
  }

  find(query = {}, sort = false) {
    return this.promise('find', query, false, sort);
  }

  findOne(query = {}, sort = false) {
    return this.promise('findOne', query, false, sort);
  }

  count(query = {}, sort = false) {
    return this.promise('count', query, false, sort);
  }

  update(query, doc, params = {}) {
    return this.promise('update', [query, doc, params], true);
  }

  destroy(query, params = {}) {
    return this.promise('remove', [query, params], true);
  }

  upsert(doc) {
    return this.promise('update', [{ id: doc.id }, doc, { upsert: true }], true);
  }

  upsertAll(docs) {
    return Promise.all(docs.map(doc => this.upsert(doc)));
  }

  lastRecord(query) {
    return this.findOne(query, {created: -1});
  }
}
