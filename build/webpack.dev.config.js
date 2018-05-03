'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const {VueLoaderPlugin} = require('vue-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../src/app.js')
  ],
  // entry: {
  //   app: path.resolve(__dirname, '../src/app.js')
  // },
  output: {
    // path: path.resolve(__dirname, '../dist'),
    path: '/',
    filename: '[name].js'
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // devOptions: {
  //   publishPath: config.dev.assetsPublicPath,
  //   stats: false,
  //   port: PORT || config.dev.port
  // },

  // these devServer options should be customized in /config/index.js
  // devServer: {
  //   clientLogLevel: 'warning',
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
  //     ],
  //   },
  //   hot: true,
  //   contentBase: false, // since we use CopyWebpackPlugin.
  //   compress: true,
  //   disableHostCheck: true,
  //   host: HOST || config.dev.host,
  //   port: PORT || config.dev.port,
  //   open: config.dev.autoOpenBrowser,
  //   overlay: config.dev.errorOverlay
  //     ? { warnings: false, errors: true }
  //     : false,
  //   publicPath: config.dev.assetsPublicPath,
  //   proxy: config.dev.proxyTable,
  //   quiet: true, // necessary for FriendlyErrorsPlugin
  //   watchOptions: {
  //     poll: config.dev.poll,
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      inject: true,
      // cnzzsiteid: '1273504169'
      cnzzsiteid: config.build.cnzzsiteid
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory
        // ignore: ['.*']
      // }, {
      //   from: path.join(__dirname, '.', 'libs.dll.js'),
      //   to: config.dev.assetsSubDirectory
      }
    ]),

    // Dll
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '..'),
    //   manifest: require('./libs-manifest.json')
    // }),
    // new HardSourceWebpackPlugin()
  ]
})


module.exports = devWebpackConfig
