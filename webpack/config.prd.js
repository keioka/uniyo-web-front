var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var production = true;
var staging = false;
var dev = false;
var debug = false;

var webpackConfigBase = require('./config.base.js');

var prdConfig = Object.assign({}, webpackConfigBase, {
  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.DefinePlugin({
      __PROD__: production,
      __STG__: staging,
      __DEV__: dev,
      __DEBUG__: debug,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: true
    })
  ],
})

prdConfig.module.rules.push({
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=[folder]--[local]--[hash:base64:5]',
      'postcss-loader',
      'sass-loader',
    ],
  }),
})

module.exports = prdConfig
