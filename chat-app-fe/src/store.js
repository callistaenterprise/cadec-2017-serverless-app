import { createStore, applyMiddleware, compose } from 'redux';

import chatApp from './reducers';
import * as mqtt from './mqtt_middleware';

const promise = () => next => action => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

const logger = store => next => action => {
  console.group = console.group || console.log;
  console.groupEnd = console.groupEnd || console.log;
  console.group(action.type);
  console.log('%c prev state', 'color:gray', store.getState());
  console.log('%c action', 'color:blue', action);
  const result = next(action);
  console.log('%c next state', 'color:green', store.getState());
  console.groupEnd(action.type);
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  chatApp,
  composeEnhancers( applyMiddleware(promise, logger, mqtt.middleware) )
);

mqtt.subscribe(store.dispatch);

export default store;
