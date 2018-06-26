import Store, { thunk } from 'repatch';
import MockConnector from './side-effects/MockConnector';
import * as config from './side-effects/config';

const initialState = {
  greeting: 'Hello World',
  options: [
    {
      type: 'slack',
      credentials: {},
      account: {},
      channels: [{ name: 'console' }]
    },
    {
      type: 'github',
      credentials: {},
      account: {},
      repos: [{ name: 'Console' }]
    }
  ]
};

const mockConnector = new MockConnector();

const store = new Store(initialState).addMiddleware(thunk.withExtraArgument({ mockConnector, config }));

window.store = store;

export default store;
