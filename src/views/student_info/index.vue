<template>
  <div>
    <Mymenu></Mymenu>
    <div>
      <mynav @func = "getClassId" ></mynav>
      <el-button style="float: right;" type="primary" @click="exportExcel">导出excel表</el-button>
    </div>
    <div class="table">
      <el-table id="exportXlsx" :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="student_id" label="学号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="学生姓名" width="120">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="parent_name" label="家长姓名" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="家长电话" width="300">
        </el-table-column>
        <el-table-column prop="id" label="身份证后六位" width="120">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button @click="handleClick(scope.row),dialogVisible = !flg" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" v-model="dialogVisible" width="35%" :before-close="handleClose">
      <div class="change">
        <span>姓名：</span>
        <el-input v-model="input" placeholder="请输入内容" style="display: inline-block !important;width: 200px;"></el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import { getClass, getStudent } from '@/api/student_info.js'
import mynav from '@/components/student_info/nav'
import FileSaver from 'file-saver'
export default {
  components: { mynav },
  data() {
    return {
      dialogVisible: false,
      tableData: [{
        student_id: '1801030161',
        name: '张小胖',
        sex: '男',
        parent_name: '张大柱',
        phone: '上海市普陀区金沙江路 1518 弄',
        id: 200333
      }]
    }
  },
  created() {
    this.getClass_student()
  },
  methods: {
    getClass_student() {
      getClass().then(response => {
        console.log(response)
      })
    },
    getClassId(data) {
      const that = this
      getStudent(data).then(response => {
        const obj = response.result.data
        for (const key in obj) {
          that.tableData[key] = {}
          that.tableData[key].student_id = obj[key].id
          that.tableData[key].name = obj[key].name
          that.tableData[key].sex = obj[key].sex
          that.tableData[key].parent_name = obj[key].family
          that.tableData[key].phone = obj[key].familyPhone
          that.tableData[key].id = obj[key].idcard
        }
        console.log(obj)
      })
      console.log(data)
    },
    exportExcel() {
      // 根据给的id获取table表，选取元素的时候加上，{raw:true}可以使表格正常导出，消除科学计数法
      const wb = XLSX.utils.table_to_book(document.getElementById('exportXlsx'), {
        raw: true
      })
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        // 给xlsx文件赋值名字
        FileSaver.saveAs(new Blob([wbout], {
          type: 'application/octet-stream'
        }), 'test.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    handleClick(index) {
      console.log(index)
    }
  }
}
</script>
<style scoped>
  .table {
    width: 53.7%;
    margin-left: 20%;
    margin-top: 2%;
  }
  .change{

  }
</style>
