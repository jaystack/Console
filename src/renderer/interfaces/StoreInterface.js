import NeDB from 'nedb';

export default class StoreInterface {
  constructor(options) {
    this.store = new NeDB(options);
  }

  promise(dbFunc, params, paramsIsArray = false, { sort, limit, skip} = {}) {
    const that = this;
    const options = paramsIsArray ? params : [params];

    return new Promise(
        (resolve, reject) => {
          if (["find","findOne","count"].includes(dbFunc)) {
            const cursor = that.store[dbFunc](...options);

            if (sort) cursor.sort(sort);
            if (limit) cursor.sort(limit);
            if (skip) cursor.sort(skip);

            cursor.exec((err, res) => {
              if (err) reject(err);
              resolve(res);
            });

          } else {

            that.store[dbFunc](...options, (err, res) => {
              if (err) reject(err);
              resolve(res);
            });
            
          }
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

  find(query = {}, config = {}) {
    return this.promise('find', query, false, config);
  }

  findOne(query = {}, config = {}) {
    return this.promise('findOne', query, false, config);
  }

  count(query = {}, config = {}) {
    return this.promise('count', query, false, config);
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
    return this.findOne(query, { sort: { created: -1 } });
  }
}
