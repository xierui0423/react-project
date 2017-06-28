const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CssNextPlugin = require('postcss-cssnext');
const fileStream = require('fs');

module.exports = (env, compileEntries) => {
  const config = {
    entry: { vendor: ['jquery', 'react', 'react-dom', 'prop-types'] },

    output: {
      path: `${__dirname}/dist`,
      publicPath: '/',
      chunkFilename: 'async-chunks/[name].js',
      filename: 'entries/[name].js',
    },

    devtool: 'inline-source-map',

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,

          // With the env preset, babel will automatically determine needed presets http://babeljs.io/docs/plugins/preset-env/
          loader: env === 'local' ? ['babel-loader'] :
          ['babel-loader', {
            loader: 'eslint-loader',
            options: {
              quiet: env === 'prod',
            },
          }],
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,

          // Note the order of loader applied is opposite with the order within the loaders array
          loader: (env === 'local' ? ['css-hot-loader'] : []).concat(ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader', options: { plugins: () => [CssNextPlugin] } },
            'sass-loader'])),
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: /^node_modules$/,
          loader: [{
            loader: 'url-loader',
            options: {
              // Images smaller than 2kb will be embedded as base64 data url
              limit: 2000,
              name: '/[path]/[name].[ext]',
              outputPath: 'assets/images',
            },
          }],
        },
        {
          test: /\.pug/,
          exclude: /^node_modules$/,
          loader: [{
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          }],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          exclude: /^node_modules$/,
          loader: [{
            loader: 'url-loader',
            options: {
              limit: Infinity,
              name: '/[name].[ext]',
              outputPath: 'assets/fonts',
            },
          }],
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

        // (Modules must be shared between 2 entries)
        minChunks: 2,
      }),
    ],
  };

  // Get entries from the entries path,
  // if the list of entries need to be compiled is given and the current entry is not included,
  // just don't add it to the config entry collection
  const entries = fileStream.readdirSync('./src/entries').filter(entry =>
    env !== 'local' || !compileEntries || !compileEntries.length || compileEntries.includes(entry));

  entries.forEach((entry) => {
    const localOnlyEntries = [    // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8080',

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server'];


    config.entry[entry] = [
      // Babel polyfill for advanced ES features
      'babel-polyfill',

      // The actual entry
      `./src/entries/${entry}/entry.jsx`,
    ];

    if (env === 'local') {
      config.entry[entry] = localOnlyEntries.concat(config.entry[entry]);
    }


    config.plugins.push(new HtmlWebpackPlugin({
      chunks: ['vendor', 'commons', entry],
      filename: `pages/${entry}.html`, // Main html output path
      template: `./src/entries/${entry}/template.pug`, // Html template path
    }));
  });

  config.plugins.push(new HtmlWebpackPlugin({
    inject: false,
    filename: 'index.html', // Main html output path
    template: './src/index.pug', // Html template path
    entries,
  }));

  return config;
};

