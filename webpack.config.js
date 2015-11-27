var ExtractText = require('extract-text-webpack-plugin');
var LessClean = require('less-plugin-clean-css');
var HtmlFile = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
  dev: {
    html: {},
    loaders: {
      less: 'css!autoprefixer?browsers=last 5 version' +
        '!less?config=lessLoaderCustom'
    },
    plugins: []
  },

  production: {
    devtool: 'source-map',
    html: {
      minify: {
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
      }
    },
    loaders: {
      less: 'css?sourceMap' +
        '!autoprefixer?browsers=last 5 version' +
        '!less?sourceMap=true&config=lessLoaderCustom'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }
}[process.env.ENV || 'dev'];

var export_config = {
  cache: true,
  devtool: config.devtool,
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
        loader: ExtractText.extract(config.loaders.less)
      }
    ]
  },
  lessLoader: {
    lessPlugins: [
      new LessClean({advanced: true})
    ]
  },

  plugins: Object.assign([
    new ExtractText('[name].css')
  ], config.plugins)
};

var k;
for (k in export_config.entry) {
  export_config.plugins.push(
    new HtmlFile(Object.assign({
      filename: k + '.html',
      template: 'index.html',
      hash: true,
      inject: 'head',
      chunks: [k]
    }, config.html))
  );
}

module.exports = export_config;
