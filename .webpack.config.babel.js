const path              = require('path');

const webpack           = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJsPlugin    = require('uglifyjs-webpack-plugin')

module.exports = {

  entry: {
    app: path.join(__dirname, './src/public')
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './lib/public'),
  },

  module: {

    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [

    new CopyWebpackPlugin([{
      from: path.join(__dirname, '/src/public/static'),
      to: path.join(__dirname, '/lib/public/static')
    }]),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

/*     
    new UglifyJsPlugin({
      sourceMap: true
    }) 
*/

  ]

};
