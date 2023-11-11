export const applySortSelect = (ctx, { prop, order }) => {
  if (ctx.sortKey) {
    prop = ctx.sortKey[prop] || prop;
  }
  if (order) {
    ctx.selectSort = `${prop},${order === 'ascending' ? 'ASC' : 'DESC'}`;
    return;
  }
  ctx.selectSort = null;
};

export const idDesc = { prop: 'id', order: 'descending' };
