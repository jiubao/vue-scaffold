const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

var webpackConfig = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}));

app.listen(3000, () => console.log('listening on port 3000'));
