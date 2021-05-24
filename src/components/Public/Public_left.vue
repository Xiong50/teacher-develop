<template>
  <div class="home_left">
    <div class="top_information">
      <span>学生信息(学号{{information.number}},第{{information.week}}周)</span>
    </div>
    <div class="top_choose">
      <div class="choose">
        <el-col :offset="1" :span="4"><el-checkbox v-model="checked" @change="change(checked)">全选</el-checkbox></el-col>
        <el-col :offset="10" :span="4"><el-button type="primary" icon="el-icon-refresh-right" size="mini">刷新</el-button></el-col>
        <el-col :span="4"><el-button type="primary" icon="el-icon-refresh" size="mini">反选</el-button></el-col>
      </div>
    </div>
    <div class="basic_information">
      <div class="top_basic_information">
        <el-row>
          <el-col :span="4"><b>选择</b></el-col>
          <el-col :span="4"><b>学号</b></el-col>
          <el-col :span="4"><b>姓名</b></el-col>
          <el-col :span="4"><b>本周</b></el-col>
          <el-col :span="4"><b>总分</b></el-col>
          <el-col :span="4"><el-button type="primary" icon="el-icon-sort" size="mini">排列</el-button></el-col>
        </el-row>
      </div>
      <div class="personal_basic_information">
        <el-row v-for="item of list " :key =item>
          <el-divider></el-divider>
          <el-col :span="4"><el-checkbox v-model="item.choose"></el-checkbox></el-col>
          <el-col :span="4">{{item.number}}</el-col>
          <el-col :span="4">{{item.name}}</el-col>
          <el-col :span="4">{{item.score}}</el-col>
          <el-col :span="4">{{item.allscore}}</el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    information: {
      type: Object
    }
  },
  data() {
    return {
      checked: false,
      list: [
        {
          choose: 'false',
          number: '1',
          name: '张三',
          score: '9',
          allscore: '99'
        },
        {
          choose: 'false',
          number: '2',
          name: '李四',
          score: '10',
          allscore: '100'
        }
      ]
    }
  },
  methods: {
    change(checked) {
      this.list.forEach(element => {
        element.choose = checked
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.home_left .top_information{
  display: flex;
  margin-bottom: 15px;
  background-color:#909399;
  padding-left: 15px;
}
.home_left .basic_information .top_basic_information .el-row{
  align-items: center;
}
.home_left .basic_information .personal_basic_information .el-divider--horizontal{
  margin: 12px 0;
}
.home_left .top_choose .choose{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.home_left .basic_information .el-row{
  text-align: center;
}
</style>
