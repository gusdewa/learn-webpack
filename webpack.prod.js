// Extension from webpack.config.js

const WebpackStrip = require('strip-loader');
const baseConfig = require('./webpack.config.js');

const stripLoader = {
  test: [/|.js$/],
  exclude: /node_module/,
  use: WebpackStrip.loader('console.log'),
};

baseConfig.module.rules.push(stripLoader);

module.exports = baseConfig;
