var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

console.log(pathSource)
console.log(pathClient)
console.log(pathPublic)


var webpackConfigBase = require('./config.base.js');

var devConfig = Object.assign({}, webpackConfigBase, {
  devServer: {
    contentBase: path.resolve(__dirname, '../')
  }
});

console.log(devConfig)

module.exports = devConfig
