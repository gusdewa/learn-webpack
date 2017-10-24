const path = require('path');
const { entriesJs, entriesCss } = require('./listFiles');

module.exports = {
  entry: Object.assign({}, entriesJs, {
    'vendors.js': './vendors.js'
  }),
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    filename: '[name]',
  }
};
