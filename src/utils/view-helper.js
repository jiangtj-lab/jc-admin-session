import { ref, reactive, computed, nextTick } from 'vue';
import { idDesc } from './sort';

export const useMainTable = ({ selectModel, api, table: defaultTable } = {}) => {
  const table = defaultTable ?? ref();
  const queryTableData = async () => {
    if (!table.value) {
      await nextTick();
    }
    if (api || selectModel) {
      table.value.setOptions({ selectModel, api });
    }
    table.value.queryTableData();
  };
  return { table, queryTableData };
};

export const useSort = ({ model, query, defaultSort }) => {
  const sort = reactive(defaultSort ?? idDesc);
  const selectSort = computed(() => {
    if (sort.order) {
      return `${sort.prop},${sort.order === 'ascending' ? 'ASC' : 'DESC'}`;
    }
    return null;
  });
  const changeSort = ({ prop, order }) => {
    Object.assign(sort, { prop, order });
    if (model) model.sort = selectSort.value;
    query(sort);
  };
  if (model) model.sort = selectSort.value;
  return { sort, selectSort, changeSort };
};

export const usePageQuery = ({ model, api }) => {
  const selectModel = model ?? reactive({});
  const tableData = ref([]);
  const total = ref(0);
  const page = ref(1);
  const pageSize = ref(10);
  const queryTableData = () => {
    selectModel.page = page.value - 1;
    selectModel.size = pageSize.value;
    api(selectModel).then((data) => {
      tableData.value = data.content;
      total.value = data.totalElements;
    });
  };
  return { selectModel, total, page, pageSize, tableData, queryTableData };
};
