import * as React from 'react';
import { Provider } from 'react-redux';
import navigationSlice, {
  navigationState
} from './appNavigation/navigationReducer';
import fractalSlice, { fractalState } from './domain/fractalReducer';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

const reducer = {
  navigationState: navigationSlice.reducer,
  fractalState: fractalSlice.reducer
};

const middleware = getDefaultMiddleware();

const preloadedState = {
  navigationState,
  fractalState
};
export type State = typeof preloadedState;

const store = configureStore<State, any>({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});

function withStateProvider(Component: React.ComponentType) {
  function WithStateProvider(props: object) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }

  return WithStateProvider;
}

export default withStateProvider;
