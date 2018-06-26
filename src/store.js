import Store, { thunk } from 'repatch';

const initialState = {
  greeting: 'Hello World'
};

const store = new Store(initialState).addMiddleware(thunk.withExtraArgument({}));

window.store = store;

export default store;
