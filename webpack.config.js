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
        test: /\.(png|jpe?g|gif|svg)$/,
        loaders: [
          'url?limit=8192&name=asset/[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "75-90", speed: 4}}'
        ]
      }, {
        test: /\.less$/,
        loader: ExtractText.extract(
          'css!autoprefixer?browsers=Android >= 4 iOS >= 7' +
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
