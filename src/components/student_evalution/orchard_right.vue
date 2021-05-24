<template>
  <div class="orchard_right">
    <div class="top_information">
      <span>行为表现评分</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default_information: '学生果园'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.orchard_right{
  border:#909399 solid;
  width: 500px;
}
.orchard_right .top_information{
  margin-bottom: 10px;
  background-color:#909399;
  padding-left: 15px;
}
</style>
