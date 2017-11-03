const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entriesJs = require('./listFiles');

const commonPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendors.js',
  minChunks(module) {
    return module.context && module.context.indexOf('node_modules') !== -1;
  },
});

const commonManifestPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest.js',
  minChunks: Infinity,
});

const extractSassPlugin = new ExtractTextPlugin({
  filename: getPath => getPath('[name].css'),
  allChunks: true,
});

module.exports = {
  entry: entriesJs,
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSassPlugin.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }, {
          loader: 'sass-loader',
        }],
        fallback: 'style-loader',
      }),
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
          presets: ['es2017', 'stage-1'],
        },
      },
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/,
      use: 'url-loader',
    }, {
      test: /\.txt$/,
      use: 'raw-loader',
    }],
  },
  resolve: {
    extensions: ['*', '.js'],
    modules: ['Views/', 'node_modules'],
  },
  plugins: [
    extractSassPlugin,
    commonPlugin,
    commonManifestPlugin,
  ],
};
