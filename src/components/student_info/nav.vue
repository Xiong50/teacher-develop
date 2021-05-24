<template>
    <div>
        <el-select v-model="value" placeholder="请选择班级" :change = "change()" >
            <el-option
              v-for="item in options_grade"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import { getClass } from '@/api/student_info.js'
export default {
  data() {
    return {
      options_grade: [{
        classId: 0,
        value: '一年级',
        label: '一年级'
      }],
      options_class: [{
        classId: 0,
        value: '一班',
        label: '一班'
      }],
      temp_obj: {},
      value: ''
    }
  },
  created() {
    this.getClass_info()
  },
  methods: {
    getClass_info() {
      const that = this
      getClass().then(response => {
        const obj = response.result.data
        for (let key = 0; key < obj.length; key++) {
          that.options_grade[key] = {}
          that.options_grade[key].label = obj[key].gradeName + ' ' + obj[key].className
          that.options_grade[key].value = obj[key].classId
        }
      })
    },
    change() {
      console.log(this.value)
      this.$emit('func', this.value)
    }
  }
}
</script>
<style scoped>
.table {
  width: 53.7%;
  margin-left: 20%;
  margin-top: 8%;
}
</style>
