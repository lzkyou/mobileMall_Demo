import axios from 'axios'

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://47.107.123.118:3000',
    timeout: 500
  })

  //2.axios的拦截器
  //2.1 axios请求拦截
  instance.interceptors.request.use(success=>{
    return success
  },err=>{
    // console.log(err);
  })

  //2.1 axios响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })
  //真正网络请求
  return instance(config)
}

