var ExtractText = require('extract-text-webpack-plugin');
var LessClean = require('less-plugin-clean-css');
var HtmlFile = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
  cache: true,
  entry: {
    android: './src/android/main.less',
    ios: './src/ios/main.less'
  },
  output: {
    path: 'build',
    filename: '[name].js',
    pathinfo: false
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?limit=8192&name=asset/[name].[ext]'
      }, {
        test: /\.less$/,
        loader: ExtractText.extract(
          'css!autoprefixer?browsers=last 5 version' +
          '!less?config=lessLoaderCustom'
        )
      }
    ]
  },
  lessLoader: {
    lessPlugins: [
      new LessClean({advanced: true})
    ]
  },

  plugins: [
    new ExtractText('[name].css')
  ]
};

var k;
for (k in config.entry) {
  config.plugins.push(
    new HtmlFile({
      filename: k + '.html',
      template: 'index.html',
      hash: true,
      inject: 'head',
      chunks: [k]
    })
  );
}

module.exports = config;
