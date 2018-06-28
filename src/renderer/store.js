import Store, { thunk } from 'repatch';
import * as config from './side-effects/config';
import connectors from './side-effects/connectors';
import NeDB from './side-effects/NeDB';

const initialState = {
  config: null,
  sources: [],
  items: [],
  query: '',
};

const db = new NeDB();
const store = new Store(initialState)
  .addMiddleware(thunk.withExtraArgument({ config, connectors, db }));

window.store = store;

export default store;
