const path = require('path');
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js'
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
  }
  // plugins: [
  //   new webpack.optimize.SplitChunksPlugin({
  //     minSize: 10000
  //   })
  // ]
}
