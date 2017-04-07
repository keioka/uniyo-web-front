var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var baseConfig = {
  context: pathSource,
  entry: {
    app: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: pathPublic,
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
    ]
  }
}

module.exports = baseConfig
