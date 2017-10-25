const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const { entriesJs } = require('./listFiles');

const config = {
  entry: entriesJs,
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    filename: '[name]',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      }),
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "sass-loader"
      }),
    }, {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/,
      use: 'url-loader',
    }, {
      test: /\.txt$/,
      use: 'raw-loader',
    }]
  },
  resolve: {
    extensions: ['*', '.js'],
    modules: ['Views/', 'node_modules']
  },
  plugins: [
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
    new ExtractTextPlugin("styles.css"),    
  ],
};

module.exports = config;
