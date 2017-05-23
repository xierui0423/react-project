// eslint-disable-next-line
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index.js'],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }],
  },

  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [
    // Used to enable HMR (hot module reloading)
    new webpack.HotModuleReplacementPlugin(),

    // Used to automatically generate the entry Html page using template
    new HtmlWebpackPlugin({
      filename: './index.html', // Main html output path
      template: './src/template/index.html', // Html template path
    })
  ],
};
