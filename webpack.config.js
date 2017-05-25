// eslint-disable-next-line
const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  cssNextPlugin = require('postcss-cssnext');

module.exports = {
  entry: [
    'babel-polyfill',

    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    './src/index.jsx'],

  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    // enable HMR on the server
    hot: true,

    // match the output path
    contentBase: `${__dirname}/dist`,

    // match the output 'publicPath'
    publicPath: '/',

  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,

        // With the env preset, babel will automatically determine needed presets http://babeljs.io/docs/plugins/preset-env/
        loaders: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,

        // Note the order of loader applied is opposite with the order within the loaders array
        loader: ExtractTextPlugin.extract([
          { loader: 'css-loader', options: { sourceMap: true, modules: true, localIdentName: '[local]-[hash:base64:5]' } },
          { loader: 'postcss-loader', options: { plugins: () => [cssNextPlugin] } },
          'sass-loader']),
      }],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    // Make css bundle
    new ExtractTextPlugin('styles.css'),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Used to automatically generate the entry Html page using template
    new HtmlWebpackPlugin({
      filename: './index.html', // Main html output path
      template: './src/template/index.html', // Html template path
    }),
  ],
};
