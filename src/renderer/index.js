import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import { ipcRenderer } from 'electron';

ipcRenderer.send('GREETING', 'Hey!');

try {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
} catch (err) {
  //alert(err.message);
  throw err;
}
