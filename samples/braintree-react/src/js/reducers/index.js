/* © 2017 NauStud.io
 * @author Thanh
 */

import { combineReducers } from 'redux';

//To avoid conflict, each module should export reducer with different names
import appReducers from './app';
import sessionReducers from './session';
import userReducers from './user';
import roleReducers from './role';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
	...appReducers,
	...sessionReducers,
	...userReducers,
	...roleReducers,
	toastr: toastrReducer,
});

export default rootReducer;
