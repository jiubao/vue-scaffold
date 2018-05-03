const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const utils = require('./utils')
var config = require('../config');
var webpackConfig = require('./webpack.dev.config.js');

const app = express();

portfinder.basePort = process.env.PORT || config.dev.port
portfinder.getPortPromise().then(port => {
  webpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: http://${config.dev.host}:${port}`],
    },
    onErrors: config.dev.notifyOnErrors
    ? utils.createNotifierCallback()
    : undefined
  }))

  var devMiddelOptions = {
    publishPath: config.dev.assetsPublicPath,
    stats: false
  }

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, devMiddelOptions));

  app.use(hotMiddleware(compiler, {
    log: false,
    heartbeat: 2000
  }))

  app.listen(port, () => console.log(`listening on port ${port}`));
})

// webpackConfigPromise.then(webpackConfig => {
//   console.log('dev: ', webpackConfig)
//   const compiler = webpack(webpackConfig);
//
//   // app.get('/', function (req, res) {
//   //   res.send('hello world')
//   // })
//
//   // app.use(webpackDevMiddleware(compiler, {
//   //   publicPath: '/'
//   // }));
//   app.use(webpackDevMiddleware(compiler, webpackConfig.devOptions));
//
//   app.use(hotMiddleware(compiler, {
//     log: false,
//     heartbeat: 2000
//   }))
//
//   var port = webpackConfig.devOptions.port
//   app.listen(port, () => console.log(`listening on port ${port}`));
//
// })
