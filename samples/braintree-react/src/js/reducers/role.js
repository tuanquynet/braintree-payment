
import { AppFlowActions } from '../constants';

// Takes care of changing the application state
function rolesData(state = {}, action) {
	// return state;
	switch (action.type) {
		case AppFlowActions.GET_ROLES_REQUEST_COMPLETE:
			return { ...state, roles: action.data.body };
		default:
			return state;
	}
}

export default {
	rolesData,
};
