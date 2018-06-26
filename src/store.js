import Store, { thunk } from 'repatch';
import MockConnector from './side-effects/MockConnector';

const initialState = {
  greeting: 'Hello World'
};

const mockConnector = new MockConnector({ token: 'shh' }, { account: 'Z' });

const store = new Store(initialState).addMiddleware(thunk.withExtraArgument({ mockConnector }));

window.store = store;

export default store;
