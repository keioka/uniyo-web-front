var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var baseConfig = {
  context: pathSource,
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './index.jsx',
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: pathPublic,
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(uniyo-redux)\/).*/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.(css)$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1',
          'postcss-loader'
        ]
      },
      {
　　　　　test: /(normalize\.css)$/,
     　　loaders: ['style-loader', 'css-loader']
      },
    ]
  },
}

module.exports = baseConfig
