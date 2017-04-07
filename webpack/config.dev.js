var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var webpackConfigBase = require('./config.base.js');

var devConfig = Object.assign({}, webpackConfigBase, {
  devServer: {
    contentBase: path.resolve(__dirname, '../')
  }
});

module.exports = devConfig
