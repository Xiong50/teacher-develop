<template>
  <div class="top-menu">
    <div class="top">
      <div class="top-left">珠海市XXXXXX学校</div>
      <div class="top-right">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
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
    <div class="menu">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template v-slot:title><span @click="func('/home')">学生评价</span></template>
          <el-menu-item v-for="(item, i) in one" :key="i" :index="item.name">{{
            item.navItem
          }}</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template v-slot:title><span @click="func('/history_evalution')">历史评价</span></template>
          <el-menu-item v-for="(item, i) in two" :key="i" :index="item.name">{{
            item.navItem
          }}</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template v-slot:title><span @click="func('/home')">学生信息</span></template>
          <el-menu-item
            v-for="(item, i) in three"
            :key="i"
            :index="item.name"
            >{{ item.navItem }}</el-menu-item
          >
        </el-submenu>
        <el-submenu index="4">
          <template v-slot:title><span @click="func('/home')">评价统计</span></template>
          <el-menu-item v-for="(item, i) in four" :key="i" :index="item.name">{{
            item.navItem
          }}</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template v-slot:title><span @click="func('/home')">排行榜</span></template>
          <el-menu-item v-for="(item, i) in five" :key="i" :index="item.name">{{
            item.navItem
          }}</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template v-slot:title><span @click="func('/home')">期末评语</span></template>
          <el-menu-item v-for="(item, i) in six" :key="i" :index="item.name">{{
            item.navItem
          }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      one: [{ name: '/orchard', navItem: '学生果园' }],
      two: [
        { name: '/login', navItem: '历史通知' },
        { name: '/login', navItem: '历史评价' }
      ],
      three: [
        { name: '/student', navItem: '学生信息' },
        { name: '/student', navItem: '家庭积分' }
      ],
      four: [
        { name: '/login', navItem: '班风班纪' },
        { name: '/login', navItem: '科目统计' },
        { name: '/login', navItem: '素养统计' },
        { name: '/login', navItem: '公约统计' },
        { name: '/login', navItem: '小组统计' },
        { name: '/login', navItem: '班级统计' }
      ],
      five: [{ name: '/list', navItem: '公约少年' }],
      six: [
        { name: 'grade', navItem: '录入成绩' },
        { name: '/login', navItem: '科目评价' },
        { name: '/login', navItem: '评语汇总' }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(`${keyPath[0]}/${keyPath[1]}`)
      this.$router.push({ path: `${keyPath[1]}` })
      // this.$router.push({ path: `/${keyPath[0]}/${keyPath[1]}` }) // -> 路由跳转，模板字面量，第一个就是你要跳转的首个地址，第二个就是你的子地址。你们稍微看一下应该就懂了。我就不写注释了
    },
    func(data) {
      this.$router.push(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu{
  width: 1520px;
  height: 60px;
}
.top {
  background-color: #545c64;
  width: 100%;
  height: 60px;
  text-align: center;
  align-items: center;
  position: sticky;
  position: -webkit-sticky;    // 兼容 -webkit 内核的浏览器
  top: 10px;                          // 必须设一个值，否则不生效
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
.menu {
  margin: 1% 10% 1% 10%;
  text-align: center;
  align-items: center;
}
.menu .el-menu {
  display: inline-block;

}
.menu .el-submenu{
  margin:0 40px 0 40px;
}
</style>
