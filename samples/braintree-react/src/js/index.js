import '../css/main.scss';

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createRoutes from './routes';

import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import configureStore from './store/configureStore';

import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import viLocaleData from 'react-intl/locale-data/vi';
import enMessages from './intl/en';
import viMessages from './intl/vi';
import auth from './helpers/auth';
import {PageNames} from './constants';

// import appConfig from './config';
// setup global locale data
addLocaleData(enLocaleData);
addLocaleData(viLocaleData);

// prepare the locales data object to be consumed by IntlProvider
const locales = {
	'en': {
		locale: 'en',
		messages: enMessages,
	},
	'vi': {
		locale: 'vi',
		messages: viMessages,
	}
};

// setup Redux
const store = configureStore();
let currentLanguage = store.getState().language;

// setup MatUI theme
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {deepOrange500} from 'material-ui/styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = createRoutes(hashHistory);

function renderRoot( language ) {
	const hash = window.location.hash;

	if (auth.loggedIn()) {
		let route = hash === '' ? PageNames.DASHBOARD : hash;
		if (route !== hash) {
			hashHistory.push(route);
		}
	} else {
		if (hash.indexOf('#/' + PageNames.LOGIN) < 0) {
			hashHistory.push(PageNames.LOGIN);
		}
	}

	ReactDOM.render((
		<Provider store={store} >
			<div>
				<IntlProvider {...locales[language] }>
					{routes}
				</IntlProvider>
				<ReduxToastr
					timeOut={3000}
					newestOnTop={false}
					preventDuplicates={true}
					position="top-center"
					transitionIn="fadeIn"
					transitionOut="fadeOut"
				/>
			</div>
		</Provider>
	), document.getElementById('app'));
}

// first render the app
renderRoot(currentLanguage);

// watch and re-render with new language select
store.subscribe(() => {
	let nextLanguage = store.getState().language;

	if (currentLanguage !== nextLanguage) {
		currentLanguage = nextLanguage;
		renderRoot(currentLanguage);
	}
	if (!auth.token()) {
		hashHistory.push(PageNames.LOGIN);
	}
});
