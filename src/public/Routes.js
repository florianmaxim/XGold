import React from 'react';

import About from './components/About';
import List from './components/List';
import Block from './components/Block';

import {Route, Switch} from 'react-router';

export default () =>

    <Switch>

        <Route path="/block" component={Block} />

        <Route path="/blocks" component={List} />

        <Route path="/about" component={About} />

        <Route exactPath="/" component={About} />

    </Switch>