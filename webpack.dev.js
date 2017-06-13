const Merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const CommonConfig = require('./webpack.common.js');

module.exports = function (env) {
  return Merge(CommonConfig(env), {

    plugins: [
      new StyleLintPlugin({
        quiet: false,
        syntax: 'scss',
        failOnError: true,
      }),
    ],
  });
};
