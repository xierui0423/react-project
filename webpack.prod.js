const webpack = require('webpack');
const Merge = require('webpack-merge');

const CommonConfig = require('./webpack.common.js');

module.exports = function (env) {
  return Merge(CommonConfig(env), {
    devtool: 'cheap-module-source-map',

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          keep_fnames: true,
        },
        compress: {
          drop_console: true,
        },
        comments: false,
      }),
    ],
  });
};


