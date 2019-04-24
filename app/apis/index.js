import axios from 'axios'

var instance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (!response.data) {
    return Promise.reject('服务异常')
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});