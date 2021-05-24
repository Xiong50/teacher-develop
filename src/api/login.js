import request from '@/utils/request'
// import qs from 'qs'

/**
 * 获取省份
 * @param {*} data 参数
 * @returns
 */
export function getProvince() {
  return request({
    url: '/api/school/province',
    method: 'get'
  })
}

/**
 * 获取城市
 * @param { provinceId }
 * @returns
 */
export function getCity(param) {
  return request({
    url: `/api/school/province/${param.provinceId}/city`,
    method: 'get'
  })
}

/**
 * 获取区域
 * @param { provinceId, cityId }
 * @returns
 */
export function getCountry(param) {
  return request({
    url: `api/school/province/${param.provinceId}/city/${param.cityId}/country`,
    method: 'get'
  })
}

/**
 * 获取学校
 * @param { cityId }
 * @returns
 */
export function getSchool(param) {
  return request({
    url: `/api/school/province/${param.provinceId}/city/${param.cityId}/school`,
    method: 'get'
  })
}

/**
 * 登录
 * @param { role, provinceId, cityId, schoolId, teacherName, password }
 * @returns
 */
export function signIn(param) {
  return request({
    url: `api/login?role=${param.role}&provinceId=${param.provinceId}&cityId=${param.cityId}&schoolId=${param.schoolId}&teacherName=${param.teacherName}&password=${param.password}`,
    method: 'post'
    // data: qs.stringify(param)
  })
}

/**
 * 修改密码
 * @param {role, schoolId, teacherName, idcard, newPassword}
 * @returns
 */
export function changePassword(param) {
  return request({
    url: 'api/login',
    method: 'post',
    // data: qs.stringify(param)
    params: param
  })
}
