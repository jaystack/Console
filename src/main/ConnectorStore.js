export default class ConnectorStore {

  static instance;

  constructor() {
    if (this.constructor.instance) return this.constructor.instance;
    this.collection = [];
    this.constructor.instance = this;
  }

  add(object) {
    this.collection.push(object);
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
