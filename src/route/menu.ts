/**
 * menu 作为 route 的生成依据
 */
import log from 'loglevel';
import views from '../views';
import { View } from '../utils/views';

interface Menu extends View {
  items: Array<Menu>
  meta: any
}

const menu: Array<Menu> = views.map(x => {
  const meta = Object.assign({}, x.meta);
  if (x.items) {
    meta.items = x.items.map((y: Menu) => Object.assign({}, y.meta));
  }
  return meta;
});
log.info(menu);

export default menu;
