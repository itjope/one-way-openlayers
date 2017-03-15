const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const webpackConfig = require('./webpack.config')

const parseWebpackConfig = (config) => {
  return {
    module: config.module,
    plugins: config.plugins
  }
}

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      {pattern: 'test/*.test.js', watched: false},
      {pattern: 'test/**/*.test.js', watched: false}
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'test/*.test.js': ['webpack'],
      'test/**/*.test.js': ['webpack']
    },
    webpack: parseWebpackConfig(webpackConfig),
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
