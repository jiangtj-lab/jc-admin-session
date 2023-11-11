import { h, resolveComponent, ref, reactive, computed } from 'vue';
import { Setting } from '@element-plus/icons-vue';
import classes from './table.module.css';

export default {
  props: {
    api: {
      type: Function,
      required: false,
    },
    call: {
      type: Function,
      required: false,
    },
    selectModel: {
      type: Object,
      required: false,
    },
    hideOptions: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { slots, attrs, expose }) {
    const columns = slots.default();
    const labels = columns.map((item) => item.props.label);
    const options = {};

    const tableData = ref([]);
    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(10);
    const drawer = ref(false);
    const columnsShowAble = ref(labels);

    const idDesc = { prop: 'id', order: 'descending' };
    const sort = reactive(idDesc);
    const selectSort = computed(() => {
      if (sort.order) {
        return `${sort.prop},${sort.order === 'ascending' ? 'ASC' : 'DESC'}`;
      }
      return null;
    });
    const changeSort = ({ prop, order }) => {
      Object.assign(sort, { prop, order });
      queryTableData();
    };

    const queryTableData = () => {
      let apiCall = options.api ?? props.api;
      let params = Object.assign({}, options.selectModel, props.selectModel);
      params.page = page.value - 1;
      params.size = pageSize.value;
      params.sort = selectSort.value;
      apiCall(params).then((data) => {
        tableData.value = data.content;
        total.value = data.totalElements;
      });
    };

    const setOptions = (o) => {
      Object.assign(options, o);
    };

    expose({
      total,
      page,
      pageSize,
      tableData,
      setOptions,
      queryTableData,
    });

    const ElTable = resolveComponent('el-table');
    return () => {
      const nodes = [];
      if (!props.hideOptions) {
        const optionsNode = (
          <el-row justify="end">
            <el-button class={classes.btn} type="default" size="small" onClick={() => (drawer.value = true)}>
              <el-icon>
                <Setting />
              </el-icon>
            </el-button>
          </el-row>
        );

        const drawerNode = (
          <el-drawer modelValue={drawer.value} onUpdate:modelValue={(value) => (drawer.value = value)} title="表格设置">
            <el-row>展示的列</el-row>
            <el-row>
              <el-checkbox-group
                modelValue={columnsShowAble.value}
                onUpdate:modelValue={(value) => (columnsShowAble.value = value)}>
                {labels.map((label) => {
                  return <el-checkbox key={label} label={label} />;
                })}
              </el-checkbox-group>
            </el-row>
          </el-drawer>
        );
        nodes.push(optionsNode);
        nodes.push(drawerNode);
      }

      const tableAttrs = Object.assign(
        {
          border: true,
          stripe: true,
          data: tableData.value,
          onSortChange: changeSort,
          defaultSort: sort,
        },
        attrs
      );
      const tableNode = h(ElTable, tableAttrs, {
        default: () => columns.filter((item) => columnsShowAble.value.includes(item.props.label)),
      });
      nodes.push(tableNode);

      const pageNode = (
        <el-row justify="end">
          <el-pagination
            layout="prev, pager, next, jumper"
            page-size={pageSize.value}
            page-sizes={[10, 20]}
            total={total.value}
            current-page={page.value}
            onUpdate:current-page={(value) => (page.value = value)}
            onUpdate:page-size={(value) => (pageSize.value = value)}
            onCurrentChange={() => queryTableData()}
            onSizeChange={() => queryTableData()}
          />
        </el-row>
      );
      nodes.push(pageNode);

      return nodes;
    };
  },
};
