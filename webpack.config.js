const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const { entriesJs } = require('./listFiles');

const config = {
  entry: Object.assign({}, entriesJs),
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    filename: '[name]',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader',
      ]
    }, {
      test: /\.txt$/,
      use: 'raw-loader',
    }]
  },
  plugins: [
    new MinifyPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors.js",
      minChunks: function(module){
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest.js",
      minChunks: Infinity
    }),
  ],
};

module.exports = config;
