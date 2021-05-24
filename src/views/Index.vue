<template>
  <div>这是教师端页面</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: '',
  setup() {
    // 开始创建组件
    const state = reactive({})
    // 组件挂载页面之前执行
    onBeforeMount(() => {})
    // 组件挂载到页面之后执行
    onMounted(() => {})
    return {
      ...toRefs(state)
    }
  }
}

</script>
<style scoped lang='scss'>
</style>
