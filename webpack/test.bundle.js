/*
  require all test files.

  require.context
    You can create your own context with the require.context function. It allows you to pass three parameters:

    - the directory to match within,
    - a boolean flag to include or exclude subdirectories,
    - a regular expression to match files against.
*/

var context = require.context('../src/', true, /test.js$/);
context.keys().forEach(context);
module.exports = context;
