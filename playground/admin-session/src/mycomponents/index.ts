import QueryForm from './query/query-form.vue';

import ButtonQuery from './button/button-query.vue';
import ButtonQueryDropdown from './button/button-query-dropdown.vue';
import ButtonCreate from './button/button-create.vue';

const register = (app: any, cp: any) => {
  console.log(cp);
  app.component(cp.name, cp);
};

export default {
  install(app: any) {
    const cps = [
      QueryForm,
      ButtonQuery,
      ButtonCreate,
      ButtonQueryDropdown
    ];
    cps.forEach(item => register(app, item));
  }
};
