import App from './App';

import Display from './components/Display';
import About from './components/About';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Display,
  },
  childRoutes: [
    {
      path: '/about',
      component: About,
    },
    {
      path: '/block',
      component: Display,
    },
    {
      path: '/block/:id',
      component: Display,
    },
  ],
};
