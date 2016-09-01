var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//第三方库引用
var node_modules = path.resolve(__dirname, 'node_modules');
var vendor = path.resolve(__dirname, 'vendor');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToRedux = path.resolve(node_modules, 'redux/dist/redux.min.js');
var pathToImmutable = path.resolve(node_modules, 'immutable/dist/immutable.min.js');
var fontAwesome = path.resolve(vendor, 'Font-Awesome/css/font-awesome.css');

var pagesPath = path.resolve(__dirname, 'src/pages');
var pagesArr = fs.readdirSync(pagesPath);
var entryFiles = {};
pagesArr.forEach(function(value, key) {
  entryFiles[value] = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:3000', path.resolve(pagesPath, value + '/' + value + '.jsx')];
});

var config = {
  // 入口文件配置
  entry: entryFiles,
  //输出文件配置
  output: {
    publicPath: "http://localhost:3000/src",
    path: path.resolve(__dirname, 'app'),
    filename: 'js/[name].js'
  },
  //引用依赖配置
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.less'],
    alias: {
      'react': pathToReact,
      'redux': pathToRedux,
      'immutable': pathToImmutable,
      'font-awesome': fontAwesome
    }
  },
  //插件设置
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new ExtractTextPlugin('node_modules/bootstrap/dist/css/bootstrap.min.css'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  //加载器设置
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules\/(?!(stardust))/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: [
          'babel-plugin-add-module-exports',
          'babel-plugin-transform-decorators-legacy'
        ],
        presets: ['es2015', 'react', 'stage-0', 'stage-1']
      }
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!(stardust))/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: [
          'babel-plugin-add-module-exports',
          'babel-plugin-transform-decorators-legacy'
        ],
        presets: ['es2015', 'react', 'stage-0', 'stage-1']
      }
    }, {
      test: /\.less?$/,
      exclude: /node_modules\/(?!(stardust))/,
      loader: 'style!css!autoprefixer!less'
    }, {
      test: /\.css?$/,
      exclude: /node_modules\/(?!(stardust))/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'autoprefixer-loader')
    }, {
      test: /\.woff/,
      loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf/,
      loader: 'file?prefix=font/'
    }, {
      test: /\.eot/,
      loader: 'file?prefix=font/'
    }, {
      test: /\.svg/,
      loader: 'file?prefix=font/'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }],
    noParse: [pathToReact]
  }
};

module.exports = config;
