import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { history } from '~/modules/history';

export type AppState = {};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({});
export const store = createStore<AppState, Action, {}, {}>(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history))),
);

export const dispatch = store.dispatch;

export function* rootSaga(): Generator {
    return null;
}
sagaMiddleware.run(rootSaga);
