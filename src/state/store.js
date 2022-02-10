import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducers from './duck/reducers';
import sagas from './duck/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;