var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var webpackConfigBase = require('./config.base.js');

var devConfig = Object.assign({}, webpackConfigBase, {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './index.jsx',
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __PROD__: false,
      __STG__: false,
      __DEV__: true,
      __DEBUG__: true
    })
  ],
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    historyApiFallback: true,
    hot: true,
  }
});

module.exports = devConfig
