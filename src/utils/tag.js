/**
 * <el-tag>标签一</el-tag>
 * <el-tag type="success">标签二</el-tag>
 * <el-tag type="info">标签三</el-tag>
 * <el-tag type="warning">标签四</el-tag>
 * <el-tag type="danger">标签五</el-tag>
 */
export function renderHtml(str) {
  const data = str.split(',');
  return data
    .map((item) => {
      let type = '';
      let content = item;
      if (item.startsWith('w:')) {
        type = ' type="warning"';
        content = item.substr(2);
      } else if (item.startsWith('e:')) {
        type = ' type="danger"';
        content = item.substr(2);
      } else if (item.startsWith('s:')) {
        type = ' type="success"';
        content = item.substr(2);
      } else if (item.startsWith('i:')) {
        type = ' type="info"';
        content = item.substr(2);
      }
      return `<el-tag${type}>${content}</el-tag>`;
    })
    .join('');
}
