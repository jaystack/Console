import Store, { thunk } from 'repatch';
import * as config from './side-effects/config';
import * as time from './side-effects/time';
import * as slack from './side-effects/slack';
import github from './side-effects/github';
import ConnectorManager from './side-effects/connectors/ConnectorManager';
import NeDB from './side-effects/NeDB';

const initialState = {
  config: null,
  isFetching: true,
  activeSettingsMenuItem: 'accounts',
  accounts: [],
  projects: [],
  selectedProjectId: null,
  items: [],
  query: ''
};

const store = new Store(initialState).addMiddleware(
  thunk.withExtraArgument({ config, connectors: new ConnectorManager(), db: new NeDB(), time, slack, github: github() })
);

window.store = store;

export default store;
