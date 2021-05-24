<template>
  <div class="top-grade">
    <div class="top">
      <div class="top-left">珠海市XXXXXX学校</div>
      <div class="top-right">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="fff"
          active-text-color="#fff"
        >
          <el-submenu index="0">
            <template v-slot:title>姓名</template>
            <el-menu-item index="0-1">我的积分</el-menu-item>
            <el-menu-item index="0-2">变更科目</el-menu-item>
            <el-menu-item index="0-3">修改密码</el-menu-item>
            <el-menu-item index="0-4">我的班级</el-menu-item>
            <el-menu-item index="0-5">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grade',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$$router.push({ path: `/${keyPath[0]}/${keyPath[1]}` })
    }
  }
}
</script>
<style>
  .top-menu{
    margin-bottom: 50px;
  }
  .top {
  background-color: #545c64;
  width: 100%;
  height: 60px;
  text-align: center;
  align-items: center;
}
.top .top-left {
  height: 60px;
  float: left;
  line-height: 60px;
  color: rgb(247, 242, 242);
}
.top .top-right {
  float: right;
}
</style>
