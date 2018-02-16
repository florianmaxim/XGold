require('@babel/register')({ presets: ['@babel/preset-react', '@babel/preset-env'] })

const config = require('./config.json');

const chalk = require('chalk');
const log   = console.log;

const http           = require('http');
const path           = require('path');
const fs             = require('fs');

const express        = require('express');

const react          = require('react');
const reactDomServer = require('react-dom/server');
const reactRouter    = require('react-router');

const renderToString = reactDomServer.renderToString;
const match          = reactRouter.match;
const RouterContext  = reactRouter.RouterContext;

const routes         = require('./source/Routes.Static').default

const app  = express()
app.server = http.createServer(app)

app.use('/:block/js', express.static(__dirname + '/build/js'));
app.use('/:block/static', express.static(__dirname + '/build/static'));

app.use('/js', express.static(__dirname + '/build/js'));
app.use('/static', express.static(__dirname + '/build/static'));

app.get('*', (req, res) => {

  const error = () => res.status(404).send('404')

  const htmlFilePath = path.join( __dirname, './build', 'index.html' );

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

      } else {

        var msg = `Not found: ${req.url}`;

        console.log(msg);
        res.status(404).send(msg);

      }

    });
  });

});

app.server.listen(config.port, config.url, () => {

  log(`
    [${chalk.hex('#FFD700').bold(config.name)} ${chalk.red(`(${config.version.number})`)} "${chalk.blue(config.version.name)}"]
    - Listening on port ${chalk.yellow(config.port)}
  `);

});
