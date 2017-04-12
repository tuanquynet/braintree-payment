import {
	SET_LANGUAGE
} from '../actions/index';
import {
	AppFlowActions
} from '../constants';
/*
 * The language state
 */
function language(state = 'vi', action) {
	switch (action.type) {
		case SET_LANGUAGE:
			return action.language;
		default:
			return state;
	}
}
/*
 * The pageTitle state
 */
function pageTitle(state = 'vi', action) {
	switch (action.type) {
		case AppFlowActions.CHANGE_TITLE:
			return action.currentPageTitle;
		default:
			return state;
	}
}

function tracking(state = {}, action) {
	let {
		actions
	} = state || {};
	actions = actions || [];
	actions = actions.splice(0, 9);
	actions.unshift({...action});
	return {
		...state,
		actions
	};
}

export default {
	language,
	pageTitle,
	tracking
};
