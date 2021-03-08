import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistReducer, persistStore } from 'redux-persist';
import reducer from './reducer';
import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key : "root",
  storage,
  whitelist: ['AReducer'],
  blacklist: []
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistStorage = persistStore (store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStorage}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
