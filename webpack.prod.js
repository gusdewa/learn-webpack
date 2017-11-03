const WebpackStrip = require('strip-loader');
const baseConfig = require('./webpack.dev.js');

const stripLoader = {
  test: [/|.js$/],
  exclude: /node_module/,
  use: WebpackStrip.loader('console.log'),
};

baseConfig.module.rules.push(stripLoader);

module.exports = baseConfig;
