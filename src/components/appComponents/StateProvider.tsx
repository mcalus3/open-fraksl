import * as React from 'react';
import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import appReducer from '../../stateManagement/appState/appReducer';
import fractalReducer from '../../stateManagement/FractalState/fractalReducer';
import { State } from '../../stateManagement/StateModel';
import { FractalActions } from '../../stateManagement/FractalState/fractalActions';
import { AppActions } from '../../stateManagement/appState/appActions';

const logger = createLogger();

let middleware = applyMiddleware(logger, thunk);

if (process.env.NODE_ENV === 'development') {
  middleware = composeWithDevTools(middleware);
}

const rootReducer = combineReducers<State>({
  appState: appReducer,
  fractalState: fractalReducer
});

const store = createStore(rootReducer, {}, middleware) as Store<State>;

export type Action = FractalActions | AppActions;

function withStateProvider(Component: React.ComponentType) {
  function WithStateProvider(props: object) {
    // Provider makes the state available down the React tree in the react context
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }

  return WithStateProvider;
}

export default withStateProvider;
