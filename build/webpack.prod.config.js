'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader');

// console.log("dev.css.loader: ", JSON.stringify(utils.styleLoaders({
//   sourceMap: config.build.productionSourceMap,
//   extract: true,
//   usePostCSS: true
// })))

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: 'normal',
  entry: {
    app: path.resolve(__dirname, '../src/app.js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    crossOriginLoading: 'anonymous'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      })
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new VueLoaderPlugin(),
    // extract css into its own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name].[hash].css'),
      chunkFilename: utils.assetsPath("css/[id].[hash].css")
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      cnzzsiteid: config.build.cnzzsiteid
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    // Dll
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('../vendor-manifest.json')
    })
  ]
})

// Upload static to ali oss
if (config.build.uploadToAliOSS) {
  const AliossWebpackPlugin = require('alioss-webpack-plugin')

  webpackConfig.plugins.push(
    new AliossWebpackPlugin({
      ossOptions: config.build.ossOptions,
      prefix: 'assets/h5',
      exclude: /.*\.html$/,
      enableLog: true,
      deleteMode: false
    })
  )
}

// add crossorigin='anonymous' to <script> tag
if (config.build.addCrossoriginAttr) {
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

  webpackConfig.plugins.push(
    new ScriptExtHtmlWebpackPlugin({
      custom: [{
        test: /\.js$/,
        attribute: 'crossorigin',
        value: 'anonymous'
      }]
    })
  )
}

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
