// require('dotenv').config();
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
let env = process.env.NODE_ENV;

switch (TARGET) {
	case 'start':
	case 'ios':
	case 'android':
		env = 'development';
		break;
	case 'start-local':
		env = 'local';
		break;
}

const PATHS = {
	src: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist'),
};
const port = process.env.PORT || 3021;
const host = process.env.HOST || 'localhost';
const WEBPACK_DEV_HOST = process.env.WEBPACK_DEV_HOST || 'http://localhost';
const appUrl = (WEBPACK_DEV_HOST) + ':' + (port);

process.env.BABEL_ENV = env;

// Config for ifdef-loader
const opts = {
	env,
	version: 3,
	'ifdef-verbose': true,       // add this for verbose output
	'ifdef-triple-slash': true  // add this to use double slash comment instead of default triple slash
};

const ifdefLoaderSetting = require('querystring').encode({ json: JSON.stringify(opts) });

const scssLoaderConfig = {
	test: /\.scss$/,
	include: PATHS.src,
};
scssLoaderConfig.use = (env === 'development' || env === 'local')
	? ['style-loader', 'css-loader?url=false', 'sass-loader']
	: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader?url=false', 'sass-loader'],
	});

const common = {
	target: 'web',
	stats: false,
	entry: [
		PATHS.src + '/js/index.js'
	],
	output: {
		path: PATHS.build,
		filename: 'bundle.js',
		publicPath: ''
	},
	devServer: {
		contentBase: PATHS.build,
		hot: true,
		publicPath: '',
		inline: true,
		historyApiFallback: true,
		compress: false,
		noInfo: false,
		quiet: false,

		proxy: {
			// '/api': 'http://localhost:3005',
		},
		stats: {
			colors: true,
			hash: true,
			timings: true,
			chunks: false,
		}
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['css-loader?url=false'],
			include: PATHS.src,
		},
			scssLoaderConfig,
		{
			test: /\.js?$/,
			exclude: /node_modules/,
			use: [
				{ loader: 'ifdef-loader?' + ifdefLoaderSetting },
				{
					loader: 'babel-loader?cacheDirectory',
					query: {
						'presets': [
							'es2015', 'stage-2', 'react'
						]
					}
				}],
			include: PATHS.src,
		}]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css'),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			host: host,
		}),
		new CopyWebpackPlugin([
			{ from: './src/images/', to: 'images/' },
			{ from: './src/fonts/', to: 'fonts/' },
			{ from: './src/favicon.ico' },
			{ from: './src/apple-touch-icon.png' },
		])
	]

};

const devMode = TARGET !== 'build-dev'
	&& TARGET !== 'build'
	&& (env === 'development' || env === 'local');
if (devMode) {
	common.entry = common.entry.concat([
		'react-hot-loader/patch',
		'webpack-dev-server/client?' + appUrl,
		'webpack/hot/dev-server',
	]);

	// We need to add HotModuleReplacementPlugin() prior to other plugin
	common.plugins.unshift(new webpack.HotModuleReplacementPlugin());
	module.exports = merge(common, {
		plugins: [

		],
		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader?cacheDirectory',
							query: {
								'presets': [
									'react-hmre', 'es2015', 'stage-2', 'react'
								]
							}
						}],
					include: PATHS.src,
				}
			]
		},
		devtool: 'source-map',
	});
} else {
	// config can be added here for minifying / etc
	module.exports = merge(common, {});
}
