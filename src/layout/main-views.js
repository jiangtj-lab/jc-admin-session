import dashboard from '@/views/dashboard';
import system from '@/views/system';

export default {
  install: (app) => {
    app.use(dashboard).use(system);
  },
};
