import App from './App';

import Display from './components/Display';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Display,
  },
  childRoutes: [
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
