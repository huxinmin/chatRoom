const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './client/src/index.js'),

  target: 'web',

  watchOptions: {
  	ignored: /node_modules/,
  	aggregateTimeout: 300,
  	poll: 1000
	},

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist/bundle'),
    publicPath:'/bundle'
  },

  module:{
		rules:[
			{
				test:/.js$/,
				use:[ {loader:'babel-loader'}, {loader:'eslint-loader'} ],
				exclude: /node_modules/
			},{
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true
                  }
                },
                'less-loader'
              ]
        })
      }
    ]
	},

	externals: {
  	jquery: 'jQuery',
    moment:'moment',
    anime:'anime',
    fileSaver:'file-saver',
    JSZip:'JSZip',
    _:'_', //lodash
    page:'page',
    template:'template',
    WebTorrent:'WebTorrent',
    particlesJS:'particlesJS',
    io:'io'

	},

	plugins: [
    new HtmlWebpackPlugin({
    	filename:'../html/index.html',
      template: './client/src/index.html'
    }),
    new ExtractTextPlugin("bundle.css"),
    // new UglifyJsPlugin(),
    new CleanWebpackPlugin(['./client/dist'], {root: __dirname,exclude: [ 'assets']})
  ]
};
