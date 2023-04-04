<script>
import { defineMenu } from '@/utils/views';
export default defineMenu({
  name: '账号管理',
  index: 'system-user',
  route: '/system/user'
});
</script>

<template>
  <query-form>
    <el-form-item label="名称">
      <el-input v-model="selectModel.username" placeholder="名称" />
    </el-form-item>
    <template #end>
      <el-button-group>
        <ButtonCreate @click="showDialogForm({ created: true })" />
      </el-button-group>
      <el-button-group>
        <ButtonQuery @click="queryTableData" />
      </el-button-group>
    </template>
  </query-form>


  <el-table border stripe :data="tableData" @sort-change="sort" :default-sort="defaultSort">
    <el-table-column label="ID" prop="id" width="80px" align="center" sortable="custom" />
    <el-table-column label="创建时间" prop="createTime" min-width="180px" />
    <el-table-column label="姓名" prop="username" min-width="200px" />
    <el-table-column label="操作" width="150" fixed="right">
      <template #default="scope">
        <ButtonGroupTable>
          <el-button @click="showDialogForm({ data: scope.row, readonly: true })" type="primary" size="small">查看</el-button>
          <el-button @click="showDialogForm({ data: scope.row })" type="warning" size="small">编辑</el-button>
          <el-button @click="deleteAciton(scope.row)" type="danger" size="small">删除</el-button>
        </ButtonGroupTable>
      </template>
    </el-table-column>
  </el-table>
  <el-row justify="end">
    <el-pagination layout="prev, pager, next,jumper" :total="total" @current-change="applyCurrentPage" />
  </el-row>

  <el-dialog custom-class="main-el-dialog" :title="dialog.title" v-model="dialog.visibled" width="600px">
    <el-form :model="dialog.form" ref="dialogForm" label-width="80px">
      <el-form-item label="名称" prop="username" :rules="[
        { required: true, message: '名称不能为空', trigger: 'blur' }
      ]">
        <el-input v-model="dialog.form.username" :readonly="dialog.readonly" />
      </el-form-item>
      <el-form-item v-if="dialog.created" label="密码" prop="password" :rules="[
        { required: true, message: '密码不能为空', trigger: 'blur' }
      ]">
        <el-input v-model="dialog.form.password" :readonly="dialog.readonly" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialog.visibled = false">取消</el-button>
        <el-button v-if="!dialog.readonly" type="primary" @click="dialog.submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import apis from '@/api/apis';
import { applySortSelect, idDesc } from '../../utils/sort';
import ButtonCreate from '@/mycomponents/button/button-create.vue';
import ButtonQuery from '@/mycomponents/button/button-query.vue';
import ButtonGroupTable from '@/mycomponents/button/button-group-table.vue';

const selectModel = reactive({});
const selectSort = ref(null);
const defaultSort = reactive(idDesc);
const tableData = ref([]);
const total = ref(0);
const current = ref(1);
const dialog = reactive({
  visibled: false,
  created: false,
  readonly: false,
  title: '',
  form: {},
  submit: () => true
});


const queryTableData = () => {
  selectModel.sort = selectSort.value;
  selectModel.page = current.value - 1;
  apis.getAdminUserPage(selectModel)
    .then(data => {
      tableData.value = data.content;
      total.value = data.totalElements;
    });
};
applySortSelect({ selectSort }, defaultSort);
queryTableData();

const sort = ({ prop, order }) => {
  applySortSelect({ selectSort }, { prop, order });
  queryTableData();
};
const applyCurrentPage = current => {
  current.value = current;
  queryTableData();
};

const dialogForm = ref(null);
const validateForm = successFn => {
  dialogForm.value.validate(valid => {
    if (valid) {
      successFn();
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};

const showDialogForm = ({ data, created = false, readonly = false }) => {
  dialog.readonly = readonly;
  dialog.created = created;
  dialog.visibled = true;
  if (data) {
    dialog.form = { ...data };
  }

  let submit;
  if (created) {
    dialog.title = '创建';
    dialog.form = {};
    submit = () => apis.createAdminUser(dialog.form);
  } else {
    dialog.title = '修改';
    submit = () => apis.updateAdminUser(dialog.form);
  }

  if (readonly) {
    dialog.title = '详情';
    submit = () => false;
  }

  dialog.submit = () => validateForm(() => submit()
    .then(() => {
      ElMessage.success('操作成功');
      dialog.visibled = false;
      queryTableData();
    }));
  if (data) {
    console.log(data);
  }
};
const deleteAciton = data => {
  ElMessageBox.confirm('此操作将永久删除该内容, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => apis.deleteAdminUser(data.id))
    .then(() => {
      ElMessage.success('删除成功!');
      queryTableData();
    })
    .catch(() => ElMessage.info('已取消删除'));
};
</script>
