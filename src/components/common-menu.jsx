import ElMenuItemRoute from '@/components/el-menu-item-route.vue';
import { getRoute } from '@/core/router';

const generateSingle = (Icon, index) => {
  return {
    name: index,
    component: {
      setup: () => {
        const r = getRoute(index);
        return () => (
          <ElMenuItemRoute index={index}>
            <el-icon>
              <Icon />
            </el-icon>
            {r.meta.name}
          </ElMenuItemRoute>
        );
      },
    },
  };
};

/**
 * const tree = {
 *   index: 唯一标识
 *   name: 组件名
 *   children: [{
 *     index: 唯一标识
 *     name: 组件名
 *     path?: 路由路径 (foreach 直接定义路由)
 *     component?: 组件 (foreach 直接定义路由)
 *   }]
 * }
 */
const generateMultiple = (Icon, tree) => {
  return {
    name: tree.index,
    component: {
      setup: () => {
        return () => (
          <el-sub-menu index={tree.index}>
            {{
              title: () => (
                <>
                  <el-icon>
                    <Icon />
                  </el-icon>
                  <span>{tree.name}</span>
                </>
              ),
              default: () =>
                tree.children.map(({ index, name }) => {
                  return (
                    <el-menu-item index={index} route={{ name: index }}>
                      {name}
                    </el-menu-item>
                  );
                }),
            }}
          </el-sub-menu>
        );
      },
    },
  };
};

const defineRouteFromTree = (helper, tree) => {
  tree.children.forEach((item) =>
    helper.defineRoute({
      index: item.index,
      name: item.name,
      component: item.component,
      meta: { p: [tree.name] },
    })
  );
};

export { generateSingle, generateMultiple, defineRouteFromTree };
