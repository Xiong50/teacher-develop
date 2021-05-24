<template>
  <div class="main">
    <div class="title">
      <span>期末评语（考勤/评语）</span>
    </div>
    <div class="content">
      <div class="top">
        <div class="left">
          <span>年级</span>&nbsp;
          <select style="width:40%">
            <option value="1">一年级</option>
            <option value="2">二年级</option>
          </select>
          <br>
          <br>
          <span>班级</span>&nbsp;
          <select style="width:40%">
            <option value="1">三班</option>
            <option value="2">二班</option>
          </select>
          <br>
          <br>
          <span>学期</span>&nbsp;
          <select style="width:80%">
            <option value="1">2020-2021学年度第二学期</option>
            <option value="2">2020-2021学年度第一学期</option>
          </select>
        </div>
        <div class="center">
          <button>上一位</button>
          <br><br>
          <select style="width:60%">
            <option value="1">选择学生</option>
            <option value="2">ch</option>
          </select>
          <br>
          <br>
          <button>下一位</button>
        </div>
        <div class="right">
          <span>导出全班期末评语word文档(可修改)</span>
          <br>
          <span>导出全班期末评语pdf文档(不能修改)</span>
          <br>
          <span>查看个人期末评语(先选择学生哦~)</span>
          <br>
          <a href="#">文档排版错乱？(建议使用微软Office系列打开)</a>
        </div>
      </div>
      <div class="middle">
        <div class="left">
          <div>我的成长趋势</div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div>考勤</div>
          <thead>
          <tr>
            <th style="text-align:center;padding:1px;border: 1px solid #ddd;">迟到</th>&nbsp;
             <th style="text-align:center;padding:1px;border: 1px solid #ddd;">事假</th>&nbsp;
              <th style="text-align:center;padding:1px;border: 1px solid #ddd;">病假</th>&nbsp;
               <th style="text-align:center;padding:1px;border: 1px solid #ddd;">大课间请假</th>&nbsp;
          </tr>
          </thead>
          <br>
          <br>
          <br>
          <div>获奖记录(最多4行)</div>
          <br>
          <textarea name="" id="" cols="25" rows="10">

          </textarea>
        </div>
        <div class="center">
          学科素质评价
          <br>
          <br>
          <tr>
            <th>学科</th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <th>总评</th>
          </tr>
        </div>
        <div class="right">
          <span>表扬（最多15行），评语请标注序号</span><br><br>
          <span>注：保存时语数英德育自动取前两条，其余取一条</span>
          <textarea name="" id="" cols="34" rows="10">
              请输入表扬内容
          </textarea>
          <br>
          <span>期待改进（最多5行，评语请标注序号）</span>
          <br>
          <span>注：保存时所有科目军区一条</span><br><br>
          <textarea name="" id="" cols="34" rows="8">
            请输入期待改进内容
          </textarea>
        </div>
      </div>
      <div class="bottom">
        <span>温馨提示</span>
        <br>
        <br>
        <textarea name="" id="" cols="80" rows="5">请输入温馨提示内容</textarea>
        <div>
          <div class="left">
            提示："表扬"和"期待改进"在保存后会自动重新编号，并按照科目排序
          </div>
          <div class="right">
            <button>保存</button>&nbsp;&nbsp;
            <button>保存并编译下一个</button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  .main{
    width: 100%;
    height: 900px;
  }
 .main .title{
    margin-left: 28%;
    width: 45%;
    height: 40px;
    line-height: 40px;
    color: white;
    background-color: rgb(44, 62, 80);
  }
  .main .title span{
    float: left;
    margin-left: 2%;
  }
  .top{
    margin-left: 28%;
    width: 45%;
    height: 120px;
    background-color: white;
    padding-top: 5px;
  }
  .top .left{
    float: left;
    width: 30%;
    text-align: left;
  }
  .top .center{
    float: left;
    width: 27%;
    text-align: left;
    padding-left: 3%;
  }
  .top .center button{
    background-color: rgb(44, 62, 80);
    height: 25px;
    border-radius: 10px;
    border:0;
    color: white;
  }
  .top .right{
    float: left;
    width: 40%;
    text-align: left;
  }
  .middle{
    margin-left: 28%;
    width: 45%;
    height: 500px;
    background-color: white;
  }
  .middle .left{
    float: left;
    padding-left: 10px;
    width: 32%;
    text-align: left;
  }
  .middle .center{
    float: left;
    width: 25%;
    text-align: left;
  }
  .middle .right{
    float: left;
    width: 38%;
    text-align: left;
  }
  .bottom{
    margin-left: 28%;
    width: 45%;
    height: 200px;
    background-color: white;
    padding-left: 10px;
    text-align: left;
  }
  .bottom .left{
    float: left;
  } 
  .bottom .right{
    float: right;
  }
  .bottom .right button{
    background-color: rgb(44, 62, 80);
    border: 0;
    height: 30px;
    color: white;
  }

</style>
