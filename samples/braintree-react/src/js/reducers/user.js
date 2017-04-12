
import { AppFlowActions } from '../constants';
import {result} from 'lodash';

// Takes care of changing the application state
function users(state = {}, action) {
	// return state;
	switch (action.type) {
		case AppFlowActions.GET_USERS_COMPLETE:
			return {...state, users: action.data.body};
		case AppFlowActions.COUNT_USERS_COMPLETE:
			return {...state, totalRecords: result(action, 'data.body.count')};
		default:
			return state;
	}
}

// Takes care of changing the application state
function editingUser(state = {}, action) {
	// return state;
	switch (action.type) {
		case AppFlowActions.GET_USER_COMPLETE:
			return {...state, ...result(action, 'data.body')};
		case AppFlowActions.UPDATE_EDITING_USER:
			return {...state, ...action.data};
		case AppFlowActions.SAVE_EDITING_USER_COMPLETE:
			return {...state, ...result(action, 'data.body')};
		case AppFlowActions.GET_EDITING_USER_ROLE_REQUEST_COMPLETE:
			return {...state, roles: result(action, 'data.body')};
		default:
			return state;
	}
}

export default {
	users,
	editingUser
};
