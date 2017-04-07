/*
  require all test files.
*/

var context = require.context('../../src/shared', true, /.*\.test\.js?$/);
context.keys().forEach(context);
