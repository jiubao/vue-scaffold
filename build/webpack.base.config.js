'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils.js');
const vueLoaderConfig = require('./vue-loader.config.js');
const {VueLoaderPlugin} = require('vue-loader');
const stats = require('./stats.js');
const config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const domainPath = path.join(__dirname, '..', 'src', 'domain')

function relative (dir) {
  var tmp = path.dirname(path.relative(domainPath, dir))
  // fetch domain name
  return tmp.split(path.sep)[0]
}

var entry = utils.getEntries('./src/domain', 'app.js');

module.exports = {
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
      test: /\.ejs$/,
      loader: 'ejs-compiled-loader',
      include: [resolve('src'), resolve('test')],
      exclude: /node_modules/
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: file => relative(file) + '/static/img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: file => relative(file) + '/static/media/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: file => relative(file) + '/static/fonts/[name].[hash:7].[ext]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx', '.css', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src/')
    }
  },
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
  stats
}
