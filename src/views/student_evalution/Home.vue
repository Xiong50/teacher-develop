<template>
  <div class="home">
    <div class="top">
      <HomeTop @change = 'change'></HomeTop>
    </div>
    <div class="bottom">
      <div class="left">
        <HomeLeft :information='information'></HomeLeft>
      </div>
      <div class="right">
        <HomeRight></HomeRight>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTop from '@/components/student_evalution/home_top'
import HomeLeft from '@/components/Public/Public_left'
import HomeRight from '@/components/student_evalution/home_right'
export default {
  name: 'home',
  components: {
    HomeTop,
    HomeLeft,
    HomeRight
  },
  data() {
    return {
      information: {
        week: '1',
        number: '1-10',
        classroom: '一班',
        grade: '一年级'
      }
    }
  },
  methods: {
    change(data1, data2) {
      switch (data2) {
        case 0:
          this.information.grade = data1
          break
        case 1:
          this.information.classroom = data1
          break
        case 2:
          this.information.number = data1
          break
        case 3:
          this.information.week = data1
          break
      }
    }
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
.home .left{
  width:50%;
  height: 100%;
  margin-right: 30px;
  border: #909399 solid
}
.home .right{
  height: 100%;
}
</style>
