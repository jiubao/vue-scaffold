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

// console.log("dev.css.loader: ", JSON.stringify(utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })))
// console.log("webpack.config.base.entry: ", JSON.stringify(baseWebpackConfig.entry))

const devWebpackConfig = {
  mode: 'development',
  // entry: [
  //   'webpack/hot/dev-server',
  //   'webpack-hot-middleware/client'
  //   // path.resolve(__dirname, '../src/app.js')
  // ],
  // entry: {
  //   'webpack/hot/dev-server': 'webpack/hot/dev-server',
  //   'webpack-hot-middleware/client': 'webpack-hot-middleware/client',
  //   app: path.resolve(__dirname, '../src/app.js')
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // path: '/',
    filename: '[name]/[name].js',
    // chunkFilename: utils.assetsPath('[name]/[id].[chunkhash].js'),
    chunkFilename: function (file) {
      console.log('chunk file: ', file)
      // return utils.assetsPath('[name]/[id].[chunkhash].js')
    }

    // filename: utils.assetsPath('[name]/[name].[chunkhash].js'),
    // chunkFilename: utils.assetsPath('[name]/[id].[chunkhash].js'),
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

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
    // // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: path.resolve(__dirname, '../index.html'),
    //   inject: true,
    //   // cnzzsiteid: '1273504169'
    //   cnzzsiteid: config.build.cnzzsiteid
    // }),
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
    // new HardSourceWebpackPlugin()
  ]
};

var multiHtmlConfig = utils.setMultipagePlugin('./src/domain/', 'index.ejs', {
    inject: true,
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   removeAttributeQuotes: true,
    //   minifyJS: true,
    //   minifyCSS: true,
    //   // more options:
    //   // https://github.com/kangax/html-minifier#options-quick-reference
    // },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'auto',
    // env: config.dev.env,
    cnzzsiteid: config.build.cnzzsiteid
  })


// console.log("webpack.config.entry: ", JSON.stringify(devWebpackConfig.entry))
// console.log("webpack.config: ", JSON.stringify(devWebpackConfig))

module.exports = merge(baseWebpackConfig, multiHtmlConfig, devWebpackConfig)
