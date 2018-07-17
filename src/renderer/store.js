import Store, { thunk } from 'repatch';
import * as config from './side-effects/config';
import * as time from './side-effects/time';
import * as slack from './side-effects/slack';
import * as github from './side-effects/github';
import ConnectorManager from './side-effects/connectors/ConnectorManager';
import NeDB from './side-effects/NeDB';

const initialState = {
  config: null,
  isFetching: true,
  activeSettingsMenuItem: 'projects',
  accounts: [],
  projects: [],
  selectedProjectId: null,
  items: [],
  query: ''
};

const db = new NeDB();
const connectors = new ConnectorManager();
const store = new Store(initialState).addMiddleware(
  thunk.withExtraArgument({ config, connectors, db, time, slack, github })
);

window.store = store;

export default store;
