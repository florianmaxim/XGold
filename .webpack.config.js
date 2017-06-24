const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {

  entry: {
    app: path.join(__dirname, './source'),
    vendor: ['react', 'react-dom', 'react-router', 'three' , 'whatwg-fetch']
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, './build/js'),
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

    new webpack.ProvidePlugin({
            'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),

    new CopyWebpackPlugin([
      { from: './source/static',
          to: path.join(__dirname, './build/static') }
    ]),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[hash].js',
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, './source/index.html'),
      filename: path.join(__dirname, './build/index.html'),
      inject: 'body',
    }),
    new webpack.LoaderOptionsPlugin({
      // minimize: true,
      debug: true,
      options: {
        context: __dirname,
        postcss: [Autoprefixer({ browsers: ['last 3 versions'] })],
      },
    }),

    new ExtractTextPlugin({
      filename: '[name].[hash].css',
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // 'screw_ie8': true,
        // 'warnings': false,
        // 'unused': true,
        // 'dead_code': true,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    })
  ]

};
