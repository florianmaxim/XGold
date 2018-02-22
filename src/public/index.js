import React from 'react';

import { hydrate } from "react-dom";
import { HashRouter } from 'react-router-dom';

import {Provider} from 'react-redux';

import store from './store';

import App from './App';

hydrate((

  <Provider store={store}>

    <HashRouter>

      <App/>

    </HashRouter>

  </Provider>

), document.getElementById('root'));

if(module.hot) {
   module.hot.accept();
}