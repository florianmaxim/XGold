const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {

  entry: [
     'webpack-dev-server/client?http://0.0.0.0:8080',
     'webpack/hot/only-dev-server',
     './source/index'
   ],

    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, './build/'),
    },

    module: {

      loaders: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.(scss|css)$/,
          loaders:
            [
              'style-loader',
              'css-loader?minimize&-autoprefixer',
              'postcss-loader',
              'sass-loader'
            ]
        },
      ],
    },

    plugins: [

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: '[name].[hash].js',
      }),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, './source/index.html'),
        filename: 'index.html',
        inject: 'body',
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: __dirname,
          postcss: [Autoprefixer({ browsers: ['last 3 versions'] })],
        },
      }),

      new webpack.HotModuleReplacementPlugin(),

      new webpack.NamedModulesPlugin()

    ]

};
