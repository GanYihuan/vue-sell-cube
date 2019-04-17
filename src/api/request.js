import axios from 'axios'

const service = axios.create({
  baseURL: 'https://vue-sell-1256738511.cos.ap-chengdu.myqcloud.com/', // api的base_url
  timeout: 5000 // request timeout
})

// http Request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http Response interceptor
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过 response 自定义 code 来标示请求状态，当 code 返回如下情况为权限有问题，登出并返回到登录页
     * 如通过 xmlhttprequest 状态码标识 逻辑可写在下面 error 中
     */
    const res = response.data
    if (res.status === 1) {
      return res.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
