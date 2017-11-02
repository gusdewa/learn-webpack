const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const entriesJs = require('./listFiles');

const extractSass = new ExtractTextPlugin({
  filename: (getPath) => {
    return getPath('[name].css').replace('.js', '');
  },
  allChunks: true,
});

const config = {
  entry: entriesJs,
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    filename: '[name]',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          fallback: "style-loader"
      })
    }, {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader',
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-1']
        }
      }
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
    extractSass,
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
