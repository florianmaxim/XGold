import * as config from '../config.json';
import chalk from 'chalk';

import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { StaticRouter } from 'react-router';

import path from 'path';
import express from 'express';

import { ServerStyleSheet } from 'styled-components'; 

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './public/reducers';

import App from './public/App';

const store = createStore(allReducers);

const app = express();

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {

  const context = {};

  const sheet = new ServerStyleSheet();

  const html = ReactDOMServer.renderToString(
    
    sheet.collectStyles(

      <Provider store={store}>

        <StaticRouter location={req.url} context={context}>

          <App/>

        </StaticRouter>

      </Provider>
    )
  );

  const styles = sheet.getStyleTags();

  if(context.url){
    res.writeHead(301, {
      Location: context.url
    })
    res.end();
  
  }else{

    res.header('Content-Type', 'text/html');
    res.write(`<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico"><title>XGold</title>${styles}</head><body><div id="root">${html}</div><script src="/bundle.js"></script></body></html>`)
    res.end();
    
  }
  
});


app.listen(config.port, () => {

  console.log(`
    [${chalk.hex('#FFD700').bold(config.name)} ${chalk.red(`(${config.version.number})`)} "${chalk.blue(config.version.name)}"]
    - Listening on port ${chalk.yellow(config.port)}
  `);

});
