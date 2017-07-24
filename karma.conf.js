var path = require('path');
var webpack = require('webpack');
var webpackBaseConfig = require('./webpack/config.base.js');

var webpackTestConfig = webpackBaseConfig.module.rules.push({
  test: /\.(scss)$/,
  loaders: [
    'style-loader',
    'css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=[folder]--[local]--[hash:base64:5]',
    'sass-loader'
  ]
});

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], // run test on Chrome
    singleRun: true, // run once by default,
    frameworks: ['mocha'], // use mocha test framework
    files: [
      'webpack/test.bundle.js', // use test.files.js which requires all test files.
    ],
    preprocessors: {
      'webpack/test.bundle.js': ['webpack', 'coverage'], // test files should be preprocessed by webpack.
      'src/**/*.js': ['webpack', 'coverage'], // all target of test files should be preprocessed by webpack.
    },
    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
    ],
    client: {
      mocha: {
        ui: 'bdd-lazy-var/global',
        require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],
      }
    },
    reporters: ['mocha', 'coverage'], // A list of reporters to use.
    webpack: Object.assign({}, webpackBaseConfig, {
      // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
      // https://github.com/airbnb/enzyme/issues/47#issuecomment-162240128
      // https://github.com/airbnb/enzyme/issues/302#issuecomment-207190560
      plugins: [
        new webpack.DefinePlugin({
          __PROD__: false,
          __STG__: false,
          __DEV__: true,
          __DEBUG__: true
        })
      ],
      externals: {
        'react/addons': true,
        'jsdom': 'window',
        'cheerio': 'window',
        'react/addons': true, // important!!
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    }),
    webpackServer: {
      noInfo: true //please don’t spam the console when running in karma!
    }
  });
};
