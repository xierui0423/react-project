const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CssNextPlugin = require('postcss-cssnext');
const fileStream = require('fs');

const config = {
  entry: { vendor: ['jquery', 'react', 'react-dom', 'prop-types'] },

  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    chunkFilename: 'async-chunks/[name].js',
    filename: 'entries/[name].js',
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
        loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: { sourceMap: true, modules: true, localIdentName: '[local]-[hash:base64:5]' },
          },
          { loader: 'postcss-loader', options: { plugins: () => [CssNextPlugin] } },
          'sass-loader'])),
      }],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new CleanWebpackPlugin('dist'),

    // Make css bundle
    new ExtractTextPlugin({ filename: 'assets/style/[name].css', allChunks: true }),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      // (the commons chunk name)
      names: ['commons', 'vendor'],

      // (Modules must be shared between 3 entries)
      minChunks: 2,
    }),
  ],
};

const entries = fileStream.readdirSync('./src/entries');

entries.forEach((entry) => {
  config.entry[entry] = [
    // activate HMR for React
    'react-hot-loader/patch',

    // Babel polyfill for advanced ES features
    'babel-polyfill',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // The actual entry
    `./src/entries/${entry}/entry.jsx`,
  ];


  config.plugins.push(new HtmlWebpackPlugin({
    chunks: ['vendor', 'commons', entry],
    filename: `pages/${entry}.html`, // Main html output path
    template: `./src/entries/${entry}/template.html`, // Html template path
  }));
});

config.plugins.push(new HtmlWebpackPlugin({
  inject: false,
  filename: 'index.html', // Main html output path
  template: './src/index.ejs', // Html template path
  entries,
}));

module.exports = config;
