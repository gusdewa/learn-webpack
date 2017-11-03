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

const providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
});

module.exports = {
  entry: entriesJs,
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    publicPath: '/wwwroot/assets',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
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
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2017', 'stage-1'],
        },
      },
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/,
      exclude: /node_modules/,
      use: 'url-loader?limit=100000',
    }, {
      test: /\.txt$/,
      exclude: /node_modules/,
      use: 'raw-loader',
    }],
  },
  resolve: {
    alias: {
      Images: path.resolve(__dirname, 'assets/images'),
      Fonts: path.resolve(__dirname, 'assets/fonts'),
      Styles: path.resolve(__dirname, 'assets/styles'),
      Scripts: path.resolve(__dirname, 'assets/scripts'),
    },
    extensions: ['*', '.js'],
    modules: ['Views/', 'node_modules'],
  },
  plugins: [
    extractSassPlugin,
    commonPlugin,
    commonManifestPlugin,
  ],
};
