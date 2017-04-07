var webpack = require('webpack');
var path = require('path');
var validate = require('webpack-validator');


var pathPublic = path.resolve(__dirname, '../../public');
var pathClient = path.resolve(__dirname, '../../src/client.js');
var pathSource = path.resolve(__dirname, '../../src');

console.log(pathSource)
console.log(pathClient)
console.log(pathPublic)

var devConfig = validate({
  context: pathSource,
  entry: {
    app: './client.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: pathPublic
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../public')
  }
})

module.exports = devConfig
