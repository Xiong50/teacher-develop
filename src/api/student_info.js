import request from '@/utils/request'
// import qs from 'qs'

/**
 * 获取省份
 * @param {*} data 参数
 * @returns
 */
export function getClass() {
  return request({
    url: '/api/class/teach',
    method: 'get'
  })
}
export function getStudent(param) {
  return request({
    url: `/api/student/class/${param}?pindex=0&number=10`,
    method: 'get'
  })
}
