<template>
  <div class="home_top">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="7">
        <el-button size="mini" type="info">社团</el-button>
        <el-button size="mini" type="info">小组</el-button>
        <el-button size="mini" type="info">招新</el-button>
        <el-button size="mini" type="info">班风班纪 </el-button>
      </el-col>
      <el-col :span="10">
        <span>年级</span>
        <el-dropdown
          size="mini"
          split-button
          type="primary"
          @command="handleCommand"
        >
          {{ default_grade }}
          <template #dropdown>
            <el-dropdown-menu v-for="item of grade" :key="item">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>班级</span>
        <el-dropdown
          size="mini"
          split-button
          type="primary"
          @command="handleCommand1"
        >
          {{ default_class }}
          <template #dropdown>
            <el-dropdown-menu v-for="item of classroom" :key="item">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>学号</span>
        <el-dropdown
          size="mini"
          split-button
          type="primary"
          @command="handleCommand2"
        >
          {{ default_number }}
          <template #dropdown>
            <el-dropdown-menu v-for="item of number" :key="item">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>周次</span>
        <el-dropdown
          size="mini"
          split-button
          type="primary"
          @command="handleCommand3"
        >
          {{ default_week }}
          <template #dropdown>
            <el-dropdown-menu v-for="item of week" :key="item">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
      <el-col :offset="2" :span="5">
        <div>
          <el-input
            placeholder="请输入姓名或者学号"
            v-model="input1"
            class="input-with-select"
          >
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'home_top',
  data() {
    return {
      default_grade: '一年级',
      grade: ['一年级', '二年级', '三年级', '四年级', '五年级'],
      default_class: '一班',
      classroom: ['一班', '二班', '三班', '四班', '五班'],
      default_number: '1-10',
      number: ['1-10', '11-20', '21-30', '31-40', '41-50'],
      default_week: '1',
      week: ['1', '2', '3', '4', '5']
    }
  },
  methods: {
    handleCommand(command) {
      this.default_grade = command
      this.$emit('change', command, 0)
    },
    handleCommand1(command) {
      this.default_class = command
      this.$emit('change', command, 1)
    },
    handleCommand2(command) {
      this.default_number = command
      this.$emit('change', command, 2)
    },
    handleCommand3(command) {
      this.default_week = command
      this.$emit('change', command, 3)
    }
  },
  setup() {
    return {
      input1: ref('')
    }
  }
}
</script>

<style>
.el-button--primary {
  background-color: #909399;
  border-color: #909399;
  padding: 3px 3px;
}
.el-button {
  padding: 5px;
}
.el-input__inner {
  height: 30px;
}
</style>
