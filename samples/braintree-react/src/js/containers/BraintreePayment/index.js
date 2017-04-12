/*
 * © 2017 NauStud.io
 * @author Quy Tran
 */

import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLanguage, loginRequest } from '../../actions/app';

import Panel from 'react-bootstrap/lib/Panel';
import client from 'braintree-web/client';
// import hostedFields from 'braintree-web/hosted-fields';
import config from '../../config';

class BraintreePayment extends Component {

	static propTypes = {
		// indicate this component is wrapped with injectIntl
		intl: intlShape.isRequired,
	};

	constructor() {
		super();
		this.state = {
			username: ''
		};
	}

	componentDidMount() {
		client.create({
			authorization: config.PAYMENT_CLIENT_TOKEN
		}, this.clientDidCreate);
	}

	clientDidCreate = (err, client) => {
		client.request({
			endpoint: 'payment_methods/credit_cards',
			method: 'post',
			data: {
				creditCard: {
					number: '5555555555554444',
					expirationDate: '10/20',
					cvv: '123',
					billingAddress: {
						postalCode: '12345'
					}
				}
			}
		}, function (err, response) {
			// Send response.creditCards[0].nonce to your server
		});
/*
		hostedFields.create({
			client: client,
			styles: {
				'input': {
					'font-size': '16pt',
					'color': '#3A3A3A'
				},

				'.number': {
					'font-family': 'monospace'
				},

				'.valid': {
					'color': 'green'
				}
			},
			fields: {
				number: {
					selector: '#card-number'
				},
				cvv: {
					selector: '#cvv'
				},
				expirationDate: {
					selector: '#expiration-date'
				}
			}
		}, this.hostedFieldsDidCreate);
		*/
	}

	hostedFieldsDidCreate = (err, hostedFields) => {
		const self = this
		this.submitBtn = document.getElementById('my-submit');
		this.form = document.getElementById('my-sample-form');
		this.submitBtn.addEventListener('click', (events) => {
			self.submitHandler(hostedFields, events);
		});
		this.submitBtn.removeAttribute('disabled');
	}

	submitHandler = (hostedFields, event) => {
		event.preventDefault();
		this.submitBtn.setAttribute('disabled', 'disabled');
		const self = this;
		hostedFields.tokenize(function (err, payload) {
			if (err) {
				self.submitBtn.removeAttribute('disabled');
				console.error(err);
			} else {
				console.log('tokenize');
				console.log(payload);
				self.form['payment_method_nonce'].value = payload.nonce;
				self.form.submit();
			}
		});
	}

	onSubmitForm = (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		this.props.loginRequest({ username, password });
	};

	onChangeUsername = (e) => {
		e.preventDefault();
		this.setState({ username: e.target.value });
	};

	onChangePassword = (e) => {
		e.preventDefault();
		this.setState({ password: e.target.value });
	};

	render() {
		// context.setTitle(title);
		const { username = '' } = this.state;
		return (
			<div className="col-md-4 col-md-offset-4">
				<div className="text-center">
					<h1 className="login-brand-text">Braintree Payment</h1>
				</div>
				<Panel header={<h3>Please Sign In</h3>} className="login-panel">
					<form role="form" onSubmit={this.onSubmitForm}>
						<input type="hidden" name="payment_method_nonce"/>
						<label htmlFor="card-number">Card Number</label>
						<input type="text" id="card-number" value="5555555555554444"/>

						<label htmlFor="cvv">CVV</label>
						<input type="text" id="cvv" value="123" />

						<label htmlFor="expiration-date">Expiration Date</label>
						<input type="text" id="expiration-date" value="10/20" />

						<input id="my-submit" type="submit" value="Pay" disabled />
					</form>
				</Panel>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		language: state.language,
	};
}

const mapDispatchToProps = {
	setLanguage,
	loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BraintreePayment));
