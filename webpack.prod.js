const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssNextPlugin = require('postcss-cssnext');
const fileStream = require('fs');

const config = {
  entry: { vendor: ['jquery', 'react', 'react-dom', 'prop-types'] },

  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    chunkFilename: 'async-chunks/[name].js',
    filename: 'entries/[name].js',
  },

  devtool: 'cheap-module-source-map',

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
          {
            loader: 'css-loader',
            options: { sourceMap: true, modules: true, localIdentName: '[local]-[hash:base64:5]' },
          },
          { loader: 'postcss-loader', options: { plugins: () => [cssNextPlugin] } },
          'sass-loader']),
      }],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new CleanWebpackPlugin('dist'),

    // Make css bundle
    new ExtractTextPlugin({ filename: 'assets/style/[name].css', allChunks: true }),

    new webpack.optimize.CommonsChunkPlugin({
      // (the commons chunk name)
      names: ['commons', 'vendor'],

      // (Modules must be shared between 3 entries)
      minChunks: 2,
    }),

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
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        drop_console: true,
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
};

const entries = fileStream.readdirSync('./src/entries');

entries.forEach((entry) => {
  config.entry[entry] = [
    // Babel polyfill for advanced ES features
    'babel-polyfill',

    // The actual entry
    `./src/entries/${entry}/entry.jsx`,
  ];

  config.plugins.push(new HtmlWebpackPlugin({
    chunks: ['vendor', 'commons', entry],
    filename: `pages/${entry}.html`, // Main html output path
    template: `./src/entries/${entry}/template.html`, // Html template path
  }));
});

module.exports = config;
