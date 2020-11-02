import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import authReducer from './store/reducers/auth';
import registerReducer from './store/reducers/register';
import userReducer from './store/reducers/user';
import groupReducer from './store/reducers/group';
import contractReducer from './store/reducers/contract';
import hrReducer from './store/reducers/hr';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = process.env.NODE_ENV === 'development' ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose : null || compose;

export const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
  group: groupReducer,
  contract: contractReducer,
  hr: hrReducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
