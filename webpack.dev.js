const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const package = require('./package.json');

const entriesJs = require('./listFiles');

const commonPlugin = new webpack.optimize.CommonsChunkPlugin({
  names: ['vendors', 'manifest'],
});

const extractSassPlugin = new ExtractTextPlugin({
  filename: getPath => getPath('[name].css'),
  allChunks: true,
});

const providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery'
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
});

const alias = {
  jquery: 'jquery/src/jquery',
  Images: path.resolve(__dirname, 'assets/images'),
  Fonts: path.resolve(__dirname, 'assets/fonts'),
  Styles: path.resolve(__dirname, 'assets/styles'),
  Scripts: path.resolve(__dirname, 'assets/scripts'),
};

module.exports = {
  bail: true,
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9090,
    contentBase: false,
    compress: true,
    quiet: false,
    inline: true,
    lazy: false,
    hot: true,
    host: "localhost"
  },
  entry: {
    ...entriesJs,
    vendors: Object.keys(package.dependencies), // by default, bundle all package.json's dependency
  },
  output: {
    path: path.resolve(__dirname, 'wwwroot'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: require.resolve('jquery'),
      use: [
        'imports-loader?this=>window',
        'imports-loader?define=>false'
      ]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: extractSassPlugin.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',            
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9',
                ],
                flexbox: 'no-2009',
              })
            ]
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
          presets: ['babel-preset-env'],
        },
      },
    }, {
      test: /\.(jpe?g|gif|png|svg)$/,
      exclude: /node_modules/,
      use: [{
          loader: 'url-loader',
          options: { limit: 40000 } // 40 KB
        },
        'image-webpack-loader',
      ],
    }, {
      test: /\.(ico|svg|woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[ext]'
        }
      }
    }],
  },
  resolve: {
    alias,
    extensions: ['*', '.js'],
    modules: ['Views/', 'node_modules'],
  },
  plugins: [
    definePlugin,
    new webpack.HotModuleReplacementPlugin(),
    extractSassPlugin,
    commonPlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),    
  ],
};
