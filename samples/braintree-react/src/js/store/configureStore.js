/* © 2017 NauStud.io
 * @author Thanh
 */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

/*
 * Configure store with sagas and other middleware
 * Start saga before return to parent
 */
export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		rootReducer,
		applyMiddleware(sagaMiddleware)
	);
	// start sagas here
	sagaMiddleware.run(rootSaga);

	return store;
}

