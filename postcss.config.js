module.exports = {
  plugins: [
    require('postcss-simple-vars'),
    require('postcss-gradient-transparency-fix')({}),
    require('postcss-import')({}),
    require('postcss-cssnext')({
      browsers: ['last 2 versions', '> 5%'],
    }),
  ],
};
