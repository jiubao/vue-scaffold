const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.config.js');
const {VueLoaderPlugin} = require('vue-loader');
const stats = require('./stats.js');

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/app.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader"
      // options: vueLoaderConfig
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
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../index.html')
    })
  ],
  watch: true
  // stats: stats
}
