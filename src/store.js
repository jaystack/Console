import Store, { thunk } from 'repatch';
import MockConnector from './side-effects/MockConnector';

const initialState = {
  greeting: 'Hello World',
  options: {
    slack: {
      account: {},
      channels: [{ name: 'console' }]
    },
    github: {
      account: {},
      repos: [{ name: 'Console' }]
    }
  }
};

const mockConnector = new MockConnector();

const store = new Store(initialState).addMiddleware(thunk.withExtraArgument({ mockConnector }));

window.store = store;

export default store;
