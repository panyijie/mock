var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//第三方库引用
var node_modules = path.resolve(__dirname, 'node_modules');
var vendor = path.resolve(__dirname, 'vendor');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToRedux = path.resolve(node_modules, 'redux/dist/redux.min.js');
var pathToImmutable = path.resolve(node_modules, 'immutable/dist/immutable.min.js');
var fontAwesome = path.resolve(vendor, 'Font-Awesome/css/font-awesome.css');


var config = {
  // 入口文件配置
  entry: {
    createInterface: path.resolve(__dirname, 'app/pages/createInterface/createInterface.jsx'),
    completeInterface: path.resolve(__dirname, 'app/pages/completeInterface/completeInterface.jsx'),
    editInterface: path.resolve(__dirname, 'app/pages/editInterface/editInterface.jsx'),
    editCompletingInterface: path.resolve(__dirname, 'app/pages/editCompletingInterface/editCompletingInterface.jsx'),
    interfaceDocs: path.resolve(__dirname, 'app/pages/interfaceDocs/interfaceDocs.jsx'),
    interfaceList: path.resolve(__dirname, 'app/pages/interfaceList/interfaceList.jsx'),
    unauthorized: path.resolve(__dirname, 'app/pages/unauthorized/unauthorized.jsx')
  },
  //输出文件配置
  output: {
    path: path.resolve(__dirname, 'src'),
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
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin('node_modules/bootstrap/dist/css/bootstrap.min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
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
