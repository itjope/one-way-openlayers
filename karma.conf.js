// Karma configuration
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      {pattern: 'test/*.test.js', watched: false},
      {pattern: 'test/**/*.test.js', watched: false}
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'test/*.test.js': ['webpack'],
      'test/**/*.test.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
