import App from './App';

import Block from './components/Block';
import About from './components/About';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Block,
  },
  childRoutes: [
    {
      path: 'about',
      component: About,
    },
    {
      path: ':block',
      component: Block,
    },
  ],
};
