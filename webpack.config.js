var path = require('path');
var util = require('util');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var pkg = require('./package.json');

var DEBUG = process.env.NODE_ENV !== 'production';
var WEB_BUILD = process.env.WEB_BUILD === 'true';
var CORDOVA_BUILD = !WEB_BUILD;

var cssBundle = path.join('css', util.format('[name].%s.css', pkg.version));
var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

var cssExtractTextPlugin = new ExtractTextPlugin(cssBundle, {
  allChunks: true
});

var plugins =[
  new webpack.optimize.OccurenceOrderPlugin(),
  cssExtractTextPlugin
];

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  );
}

var loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader?optional&optional=runtime'
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loader: 'json-loader'
  },
  {
    test: /\.jpe?g$|\.gif$|\.svg$|\.png$|\.woff2$|\.ttf$/,
    loader: 'file-loader?name=[path][name].[ext]'
  },
  {
    test: /\.html$/,
    loader: [
      'file-loader?name=[path][name].[ext]',
      'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'version='+pkg.version,
        'cordova='+CORDOVA_BUILD
      ].join('&')
    ].join('!')
  },
  {
    test: /\.s?css$/,
    loader: cssExtractTextPlugin.extract('style-loader', [
      'css-loader?sourceMap',
      'postcss-loader',
      'sass-loader?' + [
        'sourceMap',
        'outputStyle=expanded',
        'includePaths[]=' + path.resolve(__dirname, './app/scss'),
        'includePaths[]=' + path.resolve(__dirname, './node_modules')
      ].join('&')
    ].join('!'))
  }
];

var entry = {
  app: ['./app.jsx']
};
if (DEBUG) {
  entry.app.push('webpack/hot/dev-server');
}

var config = {
  context: path.join(__dirname, 'app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? '#inline-source-map' : false,
  entry: entry,
  output: {
    path: pkg.config.build_dir,
    publicPath: '/',
    filename: jsBundle,
    pathinfo: DEBUG
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
};

module.exports = config;
