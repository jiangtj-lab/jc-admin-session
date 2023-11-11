import { addRoute } from '@/core/router';

export const toPath = (index) => {
  let path = index.split('-').join('/');
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return path;
};

class AppHelper {
  constructor(app) {
    this.app = app;
  }

  app() {
    return this.app;
  }

  defineRoute(r) {
    if (!r.path) {
      r.path = toPath(r.index);
    }
    if (!r.meta) {
      r.meta = {};
    }
    if (r.name) {
      r.meta.name = r.name;
    }
    addRoute({
      name: r.index,
      path: r.path,
      component: r.component,
      meta: r.meta,
    });
    return this.app;
  }

  defineMenu(name, component) {
    if (typeof name !== 'string' && typeof name === 'object') {
      this.defineMenu(name.name, name.component);
      return;
    }
    this.app.component('menu-' + name, component);
  }
}

export const defineView = (fn) => (app, config) => {
  fn(new AppHelper(app), config);
};
