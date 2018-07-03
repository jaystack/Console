import Store, { thunk } from 'repatch';
import * as config from './side-effects/config';
import ConnectorManager from './side-effects/connectors/ConnectorManager';
import NeDB from './side-effects/NeDB';

const initialState = {
  config: null,
  isFetching: true,
  isSettingsOpen: true,
  projects: [],
  items: [],
  query: ''
};

const db = new NeDB();
const connectors = new ConnectorManager();
const store = new Store(initialState).addMiddleware(thunk.withExtraArgument({ config, connectors, db }));

window.store = store;

export default store;
