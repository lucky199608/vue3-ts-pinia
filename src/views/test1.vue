<template>
  <div>
    <div class="search-form">
      <el-card>
        <el-form :model="searchForm" ref="searchFormRef" label-width="80px">
          <el-row :gutter="16">
            <el-col :span="8">
              <el-form-item label="姓名" prop="sName">
                <el-input placeholder="请输入" clearable v-model="searchForm.sName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期" prop="sTime">
                <el-date-picker v-model="searchForm.sTime" value-format="YYYY-MM-DD" type="date" style="width: 100%" placeholder="请选择" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop="sSex">
                <el-select style="width: 100%" clearable v-model="searchForm.sSex" placeholder="请选择">
                  <el-option v-for="item in dicData.sexOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="组织机构" prop="sOrg">
                <el-tree-select style="width: 100%" clearable v-model="searchForm.sOrg" :data="dicData.treeData" :render-after-expand="false" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <div class="topBtn">
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary" @click="search">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="tables">
      <el-card>
        <el-table height="500" v-loading="loading" :data="tableData.data">
          <el-table-column prop="aName" label="姓名" />
          <el-table-column prop="aAge" label="年龄" />
          <el-table-column prop="aTime" label="出生日期" />
          <el-table-column prop="aSex" label="性别">
            <template #default="scope">
              <span v-if="scope.row.aSex == '1'">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="aOrg" label="所属组织" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button type="primary" link @click="see(scope.row)">查看</el-button>
              <el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
              <el-button type="primary" link @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-pag">
          <el-pagination
            v-model:current-page="tableData.current"
            v-model:page-size="tableData.size"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>

    <!--  弹框-->
    <el-dialog v-model="addFormData.dialogVisible" :title="addFormData.dialogTitle" width="30%" @close="cancel">
      <el-form :model="addFormData.addForm" ref="addFormRef" :rules="rules" label-width="80px">
        <el-row :gutter="16">
          <el-col :span="24">
            <el-form-item label="姓名" prop="aName">
              <el-input placeholder="请输入" clearable :disabled="addFormData.disabled" v-model="addFormData.addForm.aName" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="出生日期" prop="aTime">
              <el-date-picker
                v-model="addFormData.addForm.aTime"
                type="date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                :disabled="addFormData.disabled"
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="性别" prop="aSex">
              <el-select style="width: 100%" clearable :disabled="addFormData.disabled" v-model="addFormData.addForm.aSex" placeholder="请选择">
                <el-option v-for="item in dicData.sexOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="组织机构" prop="aOrg">
              <el-tree-select
                style="width: 100%"
                clearable
                :disabled="addFormData.disabled"
                v-model="addFormData.addForm.aOrg"
                :data="dicData.treeData"
                :render-after-expand="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="单位" prop="aPublic">
              <el-input placeholder="请输入" clearable :disabled="addFormData.disabled" v-model="addFormData.addForm.aPublic" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer v-if="!addFormData.disabled">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sure">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="test1">
import { onMounted, ref, reactive, nextTick } from 'vue'
import { Sex, dicApi, TreeData } from '@/api/test1'
import { ElMessage, ElMessageBox, FormRules } from 'element-plus'
import { useTest1Store, TableData } from '@/store/test1'

//搜索表单
const searchEvent = () => {
  interface SearchForm {
    sName: string
    sTime: string
    sSex: string
    sOrg: string
    aaa?: string
  }
  const searchFormRef = ref()
  const searchForm = reactive<SearchForm>({
    sName: '',
    sTime: '',
    sSex: '',
    sOrg: ''
  })
  const reset = () => {
    searchFormRef.value.resetFields()
    // getList()
  }
  const search = () => {
    tableData.current = 1
    getList()
  }
  return {
    searchFormRef,
    searchForm,
    reset,
    search
  }
}
const { searchFormRef, searchForm, reset, search } = searchEvent()

//获取字典值
const getDicEvent = () => {
  const dicData = reactive({
    sexOptions: [] as Sex[],
    treeData: [] as TreeData[]
  })
  const getDic = () => {
    dicApi('sex').then((res: any) => {
      dicData.sexOptions = res
    })
    dicApi('tree').then((res: any) => {
      dicData.treeData = res
    })
  }
  return {
    dicData,
    getDic
  }
}
const { dicData, getDic } = getDicEvent()

//列表
const tableListEvent = () => {
  const loading = ref(false)
  const tableData = reactive({
    data: [] as TableData[],
    current: 1 as number,
    size: 10 as number,
    total: 0 as number
  })
  const getList = () => {
    loading.value = true
    useTest1Store()
        .tableApi({
          current: tableData.current,
          size: tableData.size
        })
        .then((res: any) => {
          loading.value = false
          tableData.data = res.data
          tableData.total = res.total
        })
  }
  const handleSizeChange = (size: number) => {
    console.log('size', size)
    tableData.size = size
    getList()
  }
  const handleCurrentChange = (current: number) => {
    console.log('current', current)
    tableData.current = current
    getList()
  }
  const see = (row: TableData) => {
    addFormData.dialogTitle = '查看'
    addFormData.disabled = true
    addFormData.dialogVisible = true
    nextTick(() => {
      Object.assign(addFormData.addForm, row)
    })
  }
  const edit = (row: TableData) => {
    addFormData.dialogTitle = '编辑'
    addFormData.disabled = false
    addFormData.dialogVisible = true
    nextTick(() => {
      Object.assign(addFormData.addForm, row)
    })
  }
  const del = (row:TableData) => {
    ElMessageBox.confirm('确定删除吗?', '删除', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
        .then(async () => {
          await useTest1Store().delTable(row.aId as string)
          getList()
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '删除取消'
          })
        })
  }
  return {
    loading,
    tableData,
    getList,
    handleSizeChange,
    handleCurrentChange,
    see,
    edit,
    del
  }
}
const { loading, tableData, getList, handleSizeChange, handleCurrentChange, see, edit, del } = tableListEvent()

//弹框
const dialogEvent = () => {
  interface AddForm {
    aName: string
    aTime: string
    aSex: string
    aOrg: string
    aPublic: string
    aId?: string
  }
  const addFormRef = ref()
  const addFormData = reactive({
    dialogVisible: false as boolean,
    disabled: false as boolean,
    dialogTitle: '' as string,
    addForm: {
      aName: '',
      aTime: '',
      aSex: '',
      aOrg: '',
      aPublic: ''
    } as AddForm
  })
  const rules = reactive<FormRules>({
    aName: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
    aTime: [{ required: true, message: '请选择出生日期', trigger: ['blur', 'change'] }],
    aSex: [{ required: true, message: '请选择性别', trigger: ['blur', 'change'] }],
    aOrg: [{ required: true, message: '请选择组织机构', trigger: ['blur', 'change'] }]
  })
  const cancel = () => {
    addFormRef.value.resetFields()
    addFormData.dialogVisible = false
  }
  const sure = () => {
    addFormRef.value.validate(async (valid: any) => {
      if (valid) {
        await useTest1Store().editTable(addFormData.addForm)
        getList()
        cancel()
      }
    })
  }
  return {
    addFormRef,
    addFormData,
    rules,
    cancel,
    sure
  }
}
const { addFormRef, addFormData, rules, cancel, sure } = dialogEvent()

onMounted(() => {
  getDic()
  getList()
})
</script>

<style lang="less" scoped></style>
