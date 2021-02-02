import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
export const history = createHistory();
function configureStore(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
  )
  );
}

export default configureStore;
