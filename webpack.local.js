const webpack = require('webpack');
const Merge = require('webpack-merge');

const CommonConfig = require('./webpack.common.js');

module.exports = function (env) {
  return Merge(CommonConfig(env), {
    devServer: {
      // enable HMR on the server
      hot: true,

      // match the output path
      contentBase: `${__dirname}/dist`,

      // match the output 'publicPath'
      publicPath: '/',

    },

    plugins: [
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
    ],
  });
};
