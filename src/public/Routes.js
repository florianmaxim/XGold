import React from 'react';

import About from './components/About';
import List from './components/List';
import Block from './components/Block';
import Account from './components/Account';


import {Route, Switch} from 'react-router';

export default () =>

    <Switch>

        <Route path="/block/:blockNumber" component={Block} />
        <Route path="/b/:blockNumber" component={Block} />
        <Route path="/#/:blockNumber" component={Block} />

        <Route path="/block" component={Block} />

        <Route path="/list" component={List} />

        <Route path="/account" component={Account} />
        <Route path="/wallet" component={Account} />
        <Route path="/treasure" component={Account} />
        
        <Route path="/about" component={About} />
        <Route path="/x" component={About} />
        <Route path="/xgold" component={About} />

        <Route exactPath="/" component={Block} />

    </Switch>