<template>
  <div class="list">
    <div class="top">
      <HomeTop @change = 'change'></HomeTop>
    </div>
  </div>
</template>

<script>
import HomeTop from '@/components/student_evalution/home_top'

export default {
  name: 'list',
  components: {
    HomeTop
  }
}

</script>

<style lang="scss" scoped>
.home{
  margin: 0 15% 0 15%;
}
.home .top{
  margin-bottom: 25px;
}
.bottom {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
.home .right{
  height: 100%;
}
</style>
