import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';

import App from './App';

//Alternative: Exclude routes (see files: Routes.Dynamic.js && Routes.Static.js).

import Routes from './Routes.Dynamic';

const Root = () => <Router history={browserHistory} routes={Routes} />;

export default Root;


/*

export default class Root extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route
            path="about"
            getComponent={(location, callback)=> {
              System.import('./components/About').then(loadComponent(callback)).catch(throwError);
            }}
          />
          <Route
            path="users"
            getComponent={(location, callback)=> {
              System.import('./components/Users').then(loadComponent(callback)).catch(throwError);
            }}
          />
       </Route>
      </Router>
    );
  }
}


function throwError(err) {
 throw new Error(`Error loading route: ${error}`);
}
function loadComponent(callback) {
 return module => callback(null, module.default);
}

*/
