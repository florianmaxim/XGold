import App from './App';

function errorLoading(error) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

function loadRoute(cb) {
  return module => cb(null, module.default);
}

export default {
  path: '/',
  component: App,
  indexRoute: {
    getComponent(location, cb) {
      System.import('./components/Display')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  childRoutes: [
    {
      path: 'about',
      getComponent(location, cb) {
        System.import('./components/About')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/block',
      getComponent(location, cb) {
        System.import('./components/Display')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ],
};
