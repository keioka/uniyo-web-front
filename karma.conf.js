var path = require('path');
var webpack = require('webpack');

module.exports = function(config){
  config.set({
    browsers: ['Chrome'], // run test on Chrome
    singleRun: true, // run once by default,
    frameworks: ['mocha'], // use mocha test framework
    files: [
      'webpack/test.files.js' // use test.files.js which requires all test files.
    ],
    preprocessors: {
      'webpack/test.files.js': ['webpack', 'sourcemap'], // test files should be preprocessed by webpack.
      'src/shared/**/*.js': ['webpack', 'sourcemap'] // all target of test files should be preprocessed by webpack.
    },
    reporters: ['mocha', 'coverage', 'coveralls'],
  });
};
