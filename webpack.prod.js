// Extension from webpack.config.js

var WebpackStrip = require('strip-loader');
var baseConfig = require('./webpack.config.js');

var stripLoader = {
  test: [/|.js$/],
  exclude: /node_module/,
  use: WebpackStrip.loader('console.log'),
};

baseConfig.module.rules.push(stripLoader);

module.exports = baseConfig;
