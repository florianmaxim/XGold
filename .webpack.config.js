const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    app: path.join(__dirname, './source')
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
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  plugins: [

    new CopyWebpackPlugin([
      { from: './source/static',
          to: path.join(__dirname, './build/static') }
    ]),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, './source/index.html'),
      filename: path.join(__dirname, './build/index.html'),
      inject: 'body',
    }),

    new ExtractTextPlugin({
      filename: '[name].[hash].css',
    })

  ]

};
