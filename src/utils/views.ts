import { markRaw } from 'vue';
import type { DefineComponent } from 'vue';

export interface View {
  name: string,
  index: string,
  route: string,
  icon?: DefineComponent<{}, {}, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>
}

interface DView {
  meta: View
}

export function defineMenu(view: View): DView {
  if (view.icon) {
    view.icon = markRaw(view.icon);
  }
  return {
    meta: view
  };
}
