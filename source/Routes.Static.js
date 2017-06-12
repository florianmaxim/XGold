import App from './App';

import Home from './components/Home';
import About from './components/About';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Home,
  },
  childRoutes: [
    {
      path: 'about',
      component: About,
    },
    {
      path: '*',
      component: Home,
    },
  ],
};
