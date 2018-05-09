'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageConfig = require('../package.json')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getLessVariables = require('./get-less-variables')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    return [].concat(options.extract ? MiniCssExtractPlugin.loader : 'vue-style-loader').concat(loaders)
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', {
      globalVars: getLessVariables(path.join(__dirname, '../src/styles/vars.less'))
    }),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass').concat({
      loader: 'sass-resources-loader',
      options: {
        resources: [path.join(__dirname, '../src/styles/vars.scss')]
      }
    }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

let hasArgs = false
const getEntries = function (pageDir, entryPath, hot) {
  // console.log('args0: ', process.argv)
  var whiteList = undefined;
  var blackList = undefined;
  // if (process.env.NODE_ENV === 'production') {
    var moduleArray = process.argv.slice(2)
    if (moduleArray.length !== 0 && moduleArray[0] != '--config') {
      whiteList = moduleArray
      hasArgs = true
    }
    blackList = config.build.blackList;

    // console.log('white: ', whiteList)
    // console.log('black: ', blackList)
  // }

  var entry = {};
  var pageDirPath = path.join(__dirname, '..', pageDir);
  fs.readdirSync(pageDirPath)
    // 发现文件夹，就认为是页面模块
    .filter(function (f) {
      var isDirectory = fs.statSync(path.join(pageDirPath, f)).isDirectory();
      // console.log('tt: ', whiteList.indexOf(f) > -1 && isDirectory)
      if (whiteList) return whiteList.indexOf(f) > -1 && isDirectory;
      if (blackList) return blackList.indexOf(f) === -1 && isDirectory;
      return isDirectory;
    })
    .forEach(function (f) {
      var _path = [pageDir, f, entryPath].join('/')
      entry[path.basename(f)] = hot ? [_path].concat(hot) : _path
    });
  // return Object.keys(entry).map(key => entry[key]);
  return entry;
};

exports.getEntries = getEntries

exports.setMultipagePlugin = function (pageDir, entryPath, htmlOptions) {
  const pages = getEntries(pageDir, entryPath)
  let webpackConfig = { plugins: [] }
  const getWebpackConfig = function (pathname) {
    var cnzzsite = packageConfig.yhytrace[pathname];
    var cnzzsiteid = cnzzsite ? cnzzsite[process.env.YHY_ENV === 'prod' ? 'prod' : 'dev'] : ''
    const opt = Object.assign({}, {
      filename: pathname + '/index.html',
      template: pages[pathname],
      chunks: [pathname],
      cnzzsiteid,
      inject: true,
      favicon: path.resolve(__dirname, '../favicon.ico')
    }, htmlOptions);
    return new HtmlWebpackPlugin(opt)
  }
  webpackConfig.plugins = Object.keys(pages).map(pathname => getWebpackConfig(pathname))
  return webpackConfig
}
