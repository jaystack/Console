import NeDB from 'nedb';

export default class StoreInterface {
  constructor(options) {
    this.store = new NeDB(options);
  }

  promise(dbFunc, params, paramsIsArray = false) {
    const that = this;
    const options = paramsIsArray ? params : [params];

    return new Promise(
      (resolve, reject) => {
        that.store[dbFunc](...options,(err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      }
    )
  }

  insert(doc) {
    return this.promise('insert', doc);
  }

  find(query = {}) {
    return this.promise('find', query);
  }

  findOne(query = {}) {
    return this.promise('findOne', query);
  }

  count(query = {}) {
    return this.promise('count', query);
  }

  update(query,doc,params = {}) {
    return this.promise('update', [query,doc,params], true)
  }

  destroy(query,params = {}) {
    return this.promise('remove', [query,params], true)
  }

  upsert(doc) {
    return this.promise('update', [{id: doc.id}, doc, {upsert: true}], true)
  }
}
