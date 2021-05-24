/* eslint-disable no-undef */
<template>
  <div class='login'>
    <div class='description'>
      <h1>学校评价系统</h1>
    </div>
    <div class="content">
      <div class='picture-box'>
        <img class='picture-img' src="../assets/bg1-pic.png" alt="" srcset="">
      </div>
      <div class="login-form">
        <div class="login-type">
          <!-- <div class="user-title">{{ userTitle }}登录</div>
          <router-link to="/student">学生</router-link>
          <div class="education-title" @click='changeUser'>{{ educationTitle }}</div> -->
          <el-button-group>
            <el-button type="primary">老师</el-button>
            <el-button type="" @click="switchRoles('school')">学校</el-button>
            <el-button type="" @click="switchRoles('county')">区县</el-button>
            <el-button type="" @click="switchRoles('student')">学生</el-button>
          </el-button-group>
        </div>
        <!-- 省份、城市 -->
        <el-row type='flex' justify="space-between" class='select-province'>
          <el-col :span='11'>
            <el-select v-model="provinceId" filterable default-first-option placeholder="请选择省份" no-match-text='无匹配省份' @change="provinceChange($event)">
              <el-option
                v-for="(item, index) in provinceOptions"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span='11'>
            <el-select v-model="cityId" filterable default-first-option placeholder="请选择城市" no-match-text='无匹配城市' @change="cityChange($event)">
              <el-option
                v-for="(item, index) in cityOptions"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 区域 -->
        <el-select v-if="hasCountry" v-model="countryId" filterable default-first-option placeholder="请选择区域" no-match-text='无匹配区域' class='select-country' @change="countryChange($event)">
          <el-option
            v-for="(item, index) in countryOptions"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!-- 学校 -->
        <el-select v-model="schoolId" filterable default-first-option placeholder="请选择学校" no-match-text='无匹配学校' class='select-school' @change="schoolChange($event)">
          <el-option
            v-for="(item, index) in schoolOptions"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!-- 用户名 -->
        <el-input placeholder="请输入用户名" v-model="username" prefix-icon='el-icon-user' clearable></el-input>
        <!-- 密码 -->
        <el-input placeholder="请输入密码" v-model="password" prefix-icon='el-icon-unlock' show-password class='password-input'></el-input>
        <!-- 记住密码, 忘记密码 -->
        <div class="password-group">
          <el-checkbox v-model="remPassword" class='remember-password'>记住密码</el-checkbox>
          <el-button type="text" @click="dialogVisible = true">忘记密码</el-button>
          <el-dialog
            title="修改密码"
            v-model="dialogVisible"
            width="30%"
            ref="form"
            :before-close="handleClose">
            <el-form :model="form" ref="form">
              <el-form-item label="" :label-width="auto"  >
                <el-input placeholder="" v-model="school" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="" :label-width="auto">
                <el-input placeholder="用户名" v-model="teacherName" prefix-icon='el-icon-user' clearable></el-input>
              </el-form-item>
              <el-form-item label="" :label-width="auto" prop="idcard">
                <el-input placeholder="身份证后六位" v-model="idcard" prefix-icon='el-icon-user-solid' clearable></el-input>
              </el-form-item>
              <el-form-item label="" :label-width="auto" prop="newPassword1" :rules="[{ required: true, validator: validatePass, trigger: 'blur'}]">
                <el-input placeholder="新密码" v-model="newPassword1" prefix-icon='el-icon-unlock' type="password"></el-input>
              </el-form-item>
               <el-form-item label="" :label-width="auto" prop="newPassword2" :rules="[{ required: true, validator: validatePass2, trigger: 'blur'}]">
                <el-input placeholder="确认新密码" v-model="newPassword2" prefix-icon='el-icon-unlock' type="password">{{newPassword2}}</el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetPassword">确 定</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <!-- 登录 -->
        <el-button type="primary" class='login-btn' size="medium" @click='loginAction' :loading="loading">登录</el-button>
        <el-link type="primary" class="add-href">添加桌面快捷方式</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { getProvince, getCity, getCountry, getSchool, signIn, changePassword } from '@/api/login.js'
// sha1 md5加密
import sha1 from 'js-sha1'
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
import { useRouter } from 'vue-router'

export default {
  name: '',
  setup() {
    // 开始创建组件
    const state = reactive({
      provinceOptions: [], // 省份集合
      cityOptions: [], // 城市集合
      countryOptions: [], // 区域集合
      schoolOptions: [], // 学校集合
      locationProvince: '', // IP定位到的城市
      locationCity: '', // IP定位到的城市
      hasCountry: true,
      userTitle: '用户', // 普通用户、管理员登录显示的title
      educationTitle: '教育局', // 教育局登录显示的title
      role: 'teacher', // teacher: 老师或者管理员，admin：教育局
      province: '', // 省份名
      provinceId: '', // 省份id
      city: '', // 城市名
      cityId: '', // 城市id
      countryId: '', // 区域id
      school: '', // 学校名
      schoolId: '', // 学校id
      username: '', // 用户名
      password: '', // 密码
      remPassword: false, // 记住密码
      loading: false, // 登录加载中

      // 修改表单提交数据
      dialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      idcard: '',
      teacherName: '',
      newPassword1: '',
      newPassword2: ''
    })
    const router = useRouter()
    // 切换角色
    const switchRoles = (value) => {
      if (value === 'school') {
        router.push({ path: '/school' })
      } else if (value === 'county') {
        router.push({ path: '/county' })
      } else if (value === 'student') {
        router.push({ path: '/student' })
      }
    }
    // 用户与教育局切换
    const changeUser = () => {
      if (state.role === 'teacher') {
        state.userTitle = '教育局'
        state.educationTitle = '用户'
        state.role = 'admin'
      } else {
        state.userTitle = '用户'
        state.educationTitle = '教育局'
        state.role = 'teacher'
      }
    }
    // 高德地图IP定位，获取用户所在城市信息
    const showCityInfo = () => {
      // 实例化城市查询类
      // eslint-disable-next-line no-undef
      const citysearch = new AMap.CitySearch()
      // 自动获取用户IP，返回当前城市
      citysearch.getLocalCity((status, result) => {
        console.log(state, result)
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            ElNotification({
              // title: '成功',
              message: '您当前所在城市：' + result.city,
              type: 'success'
            })
            state.locationProvince = result.province
            state.locationCity = result.city
          }
        } else {
          ElNotification({
            title: '获取城市失败',
            message: result.info,
            type: 'error'
          })
        }
      })
    }
    // 查询省份
    const provincesInit = async () => {
      const res = await getProvince()
      if (res.code === 200) {
        state.provinceOptions = res.result.data
        autoLoactionProvince()
      }
    }
    // 自动填充省份，根据IP定位到的省份，让select选择框自动选择到该省份
    const autoLoactionProvince = () => {
      state.provinceOptions.forEach((item) => {
        if (state.locationProvince.indexOf(item.name) !== -1) {
          state.province = item.name
          state.provinceId = item.id
          citiesInit()
        }
      })
    }
    // 查询城市
    const citiesInit = async () => {
      const param = {
        provinceId: state.provinceId
      }
      const res = await getCity(param)
      if (res.code === 200) {
        state.cityOptions = res.result.data
        autoLoactionCity()
      }
    }
    // 自动填充城市，根据IP定位到的城市，让select选择框自动选择到该城市
    const autoLoactionCity = () => {
      state.cityOptions.forEach((item) => {
        if (state.locationCity.indexOf(item.name) !== -1) {
          state.city = item.name
          state.cityId = item.id
          if (state.provinceId === 11 || state.provinceId === 12 || state.provinceId === 31 || state.provinceId === 50) {
            state.hasCountry = false
            schoolsInit()
          } else {
            countryInit() // 查询区域
          }
        }
      })
    }
    // 查询区域
    const countryInit = async () => {
      const param = {
        provinceId: state.provinceId,
        cityId: state.cityId
      }
      const res = await getCountry(param)
      if (res.code === 200) {
        state.countryOptions = res.result.data
      }
    }
    // 省份发生变化时触发, event传递过来的是option绑定的value，也就是省份id
    const provinceChange = (event) => {
      state.provinceId = event
      if (state.provinceId === 11 || state.provinceId === 12 || state.provinceId === 31 || state.provinceId === 50) {
        state.hasCountry = false
      } else {
        state.hasCountry = true
      }
      state.provinceOptions.forEach((item) => {
        if (item.id === event) {
          state.province = item.name
        }
      })
      state.cityOptions = []
      state.city = ''
      state.cityId = ''
      state.schoolOptions = []
      state.school = ''
      state.schoolId = ''
      citiesInit()
    }
    // 城市发生变化时触发
    const cityChange = (event) => {
      state.cityId = event
      state.cityOptions.forEach((item) => {
        if (item.id === event) {
          state.city = item.name
        }
      })
      state.school = ''
      state.schoolId = ''
      if (state.provinceId === 11 || state.provinceId === 12 || state.provinceId === 31 || state.provinceId === 50) {
        schoolsInit()
      } else {
        countryInit() // 查询区域
      }
    }
    // 区域发生变化
    const countryChange = (event) => {
      state.countryId = event
      schoolsInit()
    }
    // 学校发生改变时触发
    const schoolChange = (event) => {
      state.schoolId = event
      state.schoolOptions.forEach((item) => {
        if (item.id === event) {
          state.school = item.name
        }
      })
      // 如果cookies中有teacherInfo，并且state.schoolId与cookies中的schoolId对应，则自动填充用户名和密码
      // eslint-disable-next-line no-undef
      if ($cookies.isKey('teacherInfo')) {
        // eslint-disable-next-line no-undef
        const teacherInfo = $cookies.get('teacherInfo')
        if (state.schoolId === teacherInfo.schoolId) {
          autoUsernameAndPassword()
        } else {
          state.username = ''
          state.password = ''
          state.remPassword = false
        }
      }
    }
    // 查询学校
    const schoolsInit = async () => {
      const param = {
        provinceId: state.provinceId,
        cityId: state.cityId
      }
      const res = await getSchool(param)
      if (res.code === 200) {
        state.schoolOptions = res.result.data
        // 如果cookies中有teacherInfo，并且state.cityId与cookies中的cityId对应，则自动选择上次选过的school
        // eslint-disable-next-line no-undef
        if ($cookies.isKey('teacherInfo')) {
          // eslint-disable-next-line no-undef
          const teacherInfo = $cookies.get('teacherInfo')
          if (state.cityId === teacherInfo.cityId) {
            state.schoolId = teacherInfo.schoolId
            state.school = teacherInfo.school
            if (state.schoolId === teacherInfo.schoolId) {
              autoUsernameAndPassword()
            }
          }
        }
      }
    }
    // 条件合适时自动填充账号密码
    const autoUsernameAndPassword = () => {
      // eslint-disable-next-line no-undef
      const teacherInfo = $cookies.get('teacherInfo')
      // eslint-disable-next-line no-undef
      if (teacherInfo.remPassword) {
        state.username = teacherInfo.username
        state.password = Base64.decode(teacherInfo.password)
        state.remPassword = true
      }
    }
    // 登录前验证
    const loginAction = () => {
      state.loading = true
      // 如果未选择学校
      if (state.school === '') {
        ElNotification({
          message: '请选择学校！',
          type: 'warning'
        })
        state.loading = false
      } else if (state.username === '' || state.password === '') { // 如果用户名或密码为空
        ElNotification({
          message: '用户名或密码不能为空！',
          type: 'warning'
        })
        state.loading = false
      } else {
        // 执行登录
        login()
      }
    }
    // 登录
    const login = async () => {
      const password = sha1(md5(state.password))
      const param = {
        role: state.role,
        provinceId: state.provinceId,
        cityId: state.cityId,
        schoolId: state.schoolId,
        teacherName: state.username,
        password: password
      }
      const res = await signIn(param)
      if (res.code === 200) {
        // 如果有cookies，则移除
        // eslint-disable-next-line no-undef
        if ($cookies.isKey('teacherInfo')) {
          // eslint-disable-next-line no-undef
          $cookies.remove('teacherInfo')
        }
        // 设置cookies
        const teacherInfo = {
          role: state.role,
          province: state.province,
          provinceId: state.provinceId,
          city: state.city,
          cityId: state.cityId,
          school: state.school,
          schoolId: state.schoolId,
          username: state.username,
          password: Base64.encode(state.password),
          remPassword: state.remPassword
        }
        // 设置cookies过期时间为1个月
        // eslint-disable-next-line no-undef
        $cookies.config('1m')
        // eslint-disable-next-line no-undef
        $cookies.set('teacherInfo', teacherInfo)
        state.loading = false
        // 登录成功，跳转路由
        if (res.detail === '/page/pc/evaluate') { // 跳转到教师端
          router.push({ path: '/index' })
        } else if (res.detail === '/page/pc/s/teacherScore') { // 跳转到学校端
          ElNotification({
            title: '温馨提示',
            message: '请检查一下选择的登录角色是否正确！',
            type: 'warning'
          })
        }
      }
      state.loading = false
    }
    // 判断密码是否符合校验规则
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 修改密码
    const resetPassword = async () => {
      const param = {
        role: state.role,
        schoolId: state.schoolId,
        teacherName: state.teacherName,
        idcard: state.idcard,
        newPassword: state.newPassword1
      }
      const res = await changePassword(param)
      if (res.code === 200) {
        ElNotification({
          // title: '成功',
          message: '密码修改成功！',
          type: 'success'
        })
      }
    }
    // 修改密码弹窗
    const handleClose = (done) => {
    }
    const open = () => {
      alert('hello')
    }
    // 组件挂载页面之前执行
    onBeforeMount(() => {
      showCityInfo()
    })
    // 组件挂载到页面之后执行
    onMounted(() => {
      provincesInit()
    })
    return {
      ...toRefs(state),
      switchRoles,
      changeUser,
      showCityInfo,
      provincesInit,
      autoLoactionProvince,
      citiesInit,
      countryInit,
      provinceChange,
      cityChange,
      countryChange,
      schoolsInit,
      schoolChange,
      autoUsernameAndPassword,
      login,
      validatePass,
      validatePass2,
      resetPassword,
      loginAction,
      open,
      handleClose
    }
  }
}

</script>
<style scoped lang='scss'>
$theme-color: #409EFF;
$login-form-right: 15%;
$login-form-width: 278px;
$login-form-padding: 25px;
.login {
  position: relative;
  width: 100%;
  height: calc(100vh - 15px);
  background-image: url('../assets/login-bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .description {
    position: absolute;
    top: 45px;
    left: 40px;
    h1 {
      font-size: 36px;
      color: #ffffff;
    }
  }
  .content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: 999;
    .picture-box {
      position: absolute;
      width: calc(100% - #{$login-form-right} - #{$login-form-width} - #{$login-form-padding} - #{$login-form-padding});
      display: flex;
      justify-content: center;
      .picture-img {
        width: 775px;
        height: 502px;
      }
    }
    .login-form {
      position: absolute;
      right: $login-form-right;
      width: $login-form-width;
      height: 480px;
      padding-top: 25px;
      padding-left: $login-form-padding;
      padding-right: $login-form-padding;
      border-radius: 5px;
      background-color: #ffffff;
      .login-type {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .user-title {
          font-size: 20px;
        }
        .education-title {
          font-size: 14px;
          color: $theme-color;
          cursor: pointer;
        }
      }
      .select-province {
        margin-top: 20px;
      }
      .select-country {
        width: 100%;
        margin-top: 15px;
      }
      .select-school {
        width: 100%;
        margin: 15px 0;
      }
      .password-input {
        margin: 15px 0;
      }
      .password-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 12px!important;
        .remember-password {
          font-size: 12px!important;
        }
        .find-password {
          cursor: pointer;
        }
      }
      .login-btn {
        width: 100%;
        font-size: 18px;
        margin: 20px 0;
      }
      .add-href {
        font-size: 14px;
      }
    }
  }
}
</style>
<style>
html {
  /* background-color: rgb(35, 191, 206) */
}
</style>
