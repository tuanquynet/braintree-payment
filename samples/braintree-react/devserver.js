/* © 2017 NauStud.io
 * @author Thanh
 *
 */
require('dotenv').config();
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const port = process.env.PORT || 3021;
const host = process.env.HOST || '0.0.0.0';

const config = require('./webpack.config');

// Start webapp server
new WebpackDevServer(webpack(config), config.devServer).listen(port, host, function(err) {
	if (err) {
		console.log(err);
	}

	console.log('Webpack dev server is listening at ' + host + ':' + port);
});
