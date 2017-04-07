var path = require('path');
var webpack = require('webpack');

module.exports = function(config){
  config.set({
    browsers: ['Chrome'], // run test on Chrome
    singleRun: true, // run once by default,
    frameworks: ['mocha'], // use mocha test framework
    files: [
      'webpack/test/test.files.js' // use test.files.js which requires all test files.
    ],
    preprocessors: {
      'webpack/test.files.js': ['webpack', 'sourcemap'], // test files should be preprocessed by webpack.
      'src/shared/**/*.js': ['webpack', 'sourcemap'] // all target of test files should be preprocessed by webpack.
    },
    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-sourcemap-loader'
    ],
    reporters: ['mocha', 'coverage'], // A list of reporters to use.
  });
};
