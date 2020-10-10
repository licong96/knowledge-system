import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as rootReducers from './reducers';

const middleware = [thunk];

const createConfigureStore = rootReducer => preloadedState => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)));
  return store;
};

export const configureGetFareStore = createConfigureStore(rootReducers.getFareRootReducer);
