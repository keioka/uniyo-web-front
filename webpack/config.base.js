var webpack = require('webpack');
var path = require('path');

var pathPublic = path.resolve(__dirname, '../public');
var pathClient = path.resolve(__dirname, '../src/client.js');
var pathSource = path.resolve(__dirname, '../src');

var baseConfig = {
  context: pathSource,
  entry: {
    app: [
      './index.jsx',
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: pathPublic,
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
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
　　　　　test: /(cropperjs\.css)$/,
     　　loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(scss)$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=[folder]--[local]--[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
　　　　　test: /(normalize\.css)$/,
     　　loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        loaders: ['babel-loader', 'svg-react-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        query: {
          useRelativePath: process.env.NODE_ENV === "production"
        }
      }
    ]
  },
}

module.exports = baseConfig
