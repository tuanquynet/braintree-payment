
import { AppFlowActions } from '../constants';

// Takes care of changing the application state
function session(state = {}, action) {
	switch (action.type) {
		case AppFlowActions.LOGIN_COMPLETE:
			return {...state, loggedUser: action.data.body};
		case AppFlowActions.EXPIRE_USER:
			return {...state, loggedUser: {}};
		case AppFlowActions.SET_AUTH:
		case AppFlowActions.SENDING_REQUEST:
		case AppFlowActions.REQUEST_ERROR:
		default:
			return state;
	}
}

export default {
	session
};
