const DEFAULT = {
  _NAME: '[Webpack Dev Server]',
  _VERSION: '0.0.1',
  _VERSION_NAME: 'Lemon 🍋',
  _URL: '0.0.0.0',
  _PORT: 8080
}

const path = require('path');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./.webpack.config.dev.server');

const WebpackDevServerConfig = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
};

const server = new WebpackDevServer(webpack(webpackConfig), WebpackDevServerConfig);

server.listen(DEFAULT._PORT, DEFAULT._URL, () => {
  console.log(`${DEFAULT._NAME} ${DEFAULT._VERSION} ( ${DEFAULT._VERSION_NAME} ) Listening on port ${DEFAULT._PORT}`);
});
