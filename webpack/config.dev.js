var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var webpackConfigBase = require('./config.base.js');

var devConfig = Object.assign({}, webpackConfigBase, {
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    historyApiFallback: true,
    hot: true,
  }
});

module.exports = devConfig
