<template>
  <div class="home_right">
    <div class="top_information">
      <span>行为表现评分({{default_subject}})</span>
    </div>
    <div class="subject_choose">
      <ul>
        <li v-for="item of subject" :key="item">
          <el-button size="medium " plain >{{item}}</el-button>
        </li>
      </ul>
    </div>
    <div class="evalution_content">
      <div class="top_evalution_content">
        <el-row>
          <el-col :offset="2" :span="2"><b>选择</b></el-col>
          <el-col :span="17"><b>评价内容</b></el-col>
          <el-col  :span="3"><b>分数</b></el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
      <div class="centre_evalution_content">
        <el-row v-for="item of list " :key =item>
          <el-col :offset="2" :span="2"><el-checkbox v-model="item.choose"></el-checkbox></el-col>
          <el-col :span="16">{{item.content}}</el-col>
          <el-col :offset="1" :span="2">{{item.score}}</el-col>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :offset="2" :span="2"><el-checkbox v-model="textchoose"></el-checkbox></el-col>
          <el-col :span="14">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-col>
          <el-col :offset="2" :span="3"><el-input-number v-model="num" size="mini" controls-position="right" @change="handleChange" :min="0" :max="10"></el-input-number></el-col>
        </el-row>
      </div>
      <div class="upload_evalution_content">
        <el-upload
          class="upload-demo"
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleUpload"
          :on-error="handleError"
          :on-progress="handleTest"
          :file-list="fileList"
          list-type="picture">
          <el-button size="middle" type="primary">图片上传</el-button>
          <template #tip>
            <div class="upload_tip">
              <span><b>已上传的文件</b></span>
            </div>
          </template>
        </el-upload>
      </div>
    </div>
  </div>
  <div class="summit">
    <el-button type="info" plain>上传评价</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default_subject: '体育',
      subject: ['语文', '数学', '体育', '体育', '思想道得思想道得思想道得思想道得思想道得', '思想道得', '体育', '体育', '体育', '体育', '体育', '体育', '体育'],
      list: [
        {
          choose: 'false',
          content: '多次在课堂讲闲话，你影响了老师和同学上课啦。',
          score: '9'
        }
      ],
      textchoose: 'false',
      num: 1,
      fileList: [
      ]
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    // 通知数据库删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击查看图片
    handlePreview(file) {
      console.log(file)
    },
    // 上传图片
    handleUpload(response, file, fileList) {
      console.log('这个时候进行了上传图片')
      console.log(response)
    },
    // 上传失败时
    handleError(err, file, fileList) {
      console.log('失败')
      console.log(err)
      console.log(file)
      console.log(fileList)
    },
    // 上传中
    handleTest(event, file, fileList) {
      fileList.push(file)
      console.log(fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.home_right{
  border:#909399 solid
}
.home_right .top_information{
  margin-bottom: 10px;
  background-color:#909399;
  padding-left: 15px;
}
.home_right .subject_choose{
  margin: 5px 0 5px 0 ;
  padding:0 20px 0 20px;
}
.home_right .subject_choose ul{
  list-style:none;
  padding: 0;
  display: flex;
  flex-direction: row ;
  flex-wrap: wrap;
  justify-content: space-between;
}
.home_right .subject_choose li{
  float:left
  // display:inline-block
}
.home_right .subject_choose li button{
  margin-right: 10px;
  margin-top: 5px;
}
.home_right .evalution_content .centre_evalution_content .el-input-number{
  align-items:center;
  width: 80px;
  height: 27px;
  padding-left: 15px;
}
.home_right .evalution_content .upload_evalution_content{
  margin-top: 30px;
}
.home_right .evalution_content .upload_evalution_content .upload_tip{
  margin-top: 10px;
  height:40px;
  line-height:40px;
  background-color: #909399;
  text-align: center;
  align-items: center;
}

.summit{
  margin-top: 10px;
  text-align: center;
  align-items: center;
}
</style>
