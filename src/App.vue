<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div>
    <!-- <el-menu :router="true" mode="horizontal" default-active="/">
      <el-menu-item index="/">老师</el-menu-item>
      <el-menu-item index="/student">学生</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
    </el-menu> -->
    <router-view></router-view>
    <div id="container"></div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
