'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils.js');
const vueLoaderConfig = require('./vue-loader.config.js');
const {VueLoaderPlugin} = require('vue-loader');
const stats = require('./stats.js');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // mode: 'development',
  // entry: {
  //   app: path.resolve(__dirname, '../src/app.js')
  // },
  // output: {
  //   path: path.resolve(__dirname, '../dist'),
  //   filename: '[name].js'
  // },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter'),
        // emitWarning: !config.dev.showEslintErrorsInOverlay
      }
    }, {
      test: /\.vue$/,
      loader: "vue-loader",
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src/')
    }
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      minSize: 10000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  // devtool: 'source-map',
  // plugins: [
  //   new VueLoaderPlugin(),
  //   new HtmlWebpackPlugin({
  //     inject: true,
  //     template: path.resolve(__dirname, '../index.html')
  //   })
  // ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // watch: true,
  stats: false
  // stats: stats
}
