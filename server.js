require('babel-core/register')({ presets: ['latest', 'react'] })

const DEFAULT = {
  _NAME: '[Custom Server]',
  _VERSION: '0.0.1',
  _VERSION_NAME: 'Lemon',
  _URL: '0.0.0.0',
  _PORT: 8080
}

const http           = require('http');
const path           = require('path');
const fs             = require('fs');

const express        = require('express');

const react          = require('react')
const reactDomServer = require('react-dom/server')
const reactRouter    = require('react-router')

const renderToString = reactDomServer.renderToString
const match          = reactRouter.match
const RouterContext  = reactRouter.RouterContext

const routes         = require('./source/Routes.Static').default

const app = express()
app.server = http.createServer(app)

app.use(express.static('./build'))

app.get('*', (req, res) => {

  const error = () => res.status(404).send('404')

  const htmlFilePath = path.join( __dirname, './build', 'index.html' )

  fs.readFile( htmlFilePath, 'utf8', (err, htmlData) => {

    if(err) throw error();

    match({ routes, location: req.url }, (err, redirect, ssrData) => {

      if(err) throw error();

      else if(redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      }

      else if(ssrData) {

        const ReactApp = renderToString( react.createElement(RouterContext, ssrData) );

        const RenderedApp = htmlData.replace(`<div id="root"></div>`, `<div id="root">${ReactApp}</div>`);

        res.status(200).send(RenderedApp);

      }

    });
  });
});

app.server.listen(DEFAULT._PORT, DEFAULT._URL, () => {
  console.log(`${DEFAULT._NAME} ${DEFAULT._VERSION} (${DEFAULT._VERSION_NAME}) Listening on port ${DEFAULT._PORT}`);
});
