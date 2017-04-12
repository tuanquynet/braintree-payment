/*
 * © 2017 NauStud.io
 * @author tien.tran@naustud.io
 */

import React from 'react';
import { Router, Route } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import AppInitialization from './containers/AppInitialization';
import UserListing from './containers/User/UserListing';
import UserEdit from './containers/User/UserEdit';
import BraintreePayment from './containers/BraintreePayment';

import {PageNames} from './constants';

const createRoutes = (history) => {
	return (
		<Router history={history}>
			<Route path={PageNames.APP_LOADING} component={AppInitialization} name="AppInitialization" />
			<Route component={App}>
				<Route path={PageNames.DASHBOARD} component={Dashboard} name="Dashboard" />
				<Route path={PageNames.USER_LISTING} component={UserListing} name="UserListing" />
				<Route path={PageNames.USER_EDIT} component={UserEdit} name="UserEdit" />
				<Route path={PageNames.USER_PROFILE} component={UserEdit} name="UserProfile" />
			</Route>
			<Route path={PageNames.LOGIN} component={BraintreePayment} name="Login" />
		</Router>
	);
};

export default createRoutes;
