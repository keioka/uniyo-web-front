var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var webpackConfigBase = require('./config.base.js');

var devConfig = Object.assign({}, webpackConfigBase, {
  devtool: 'eval',
  entry: {
    app: [
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
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    publicPath: '/public',
    historyApiFallback: true,
    // { hot: true } causes webpack will expose the module.hot API to our code
    hot: true
  }
});

module.exports = devConfig
