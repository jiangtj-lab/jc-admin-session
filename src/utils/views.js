import { markRaw } from 'vue';

export function defineMenu(view) {
  if (view.icon) {
    view.icon = markRaw(view.icon);
  }
  return {
    meta: view
  };
}
