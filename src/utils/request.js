import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store  from '../store'
import {getToken} from '@/utils/token'

// 创建axios实例
const service = axios.create({
    // url = base url + request url
    baseURL:process.env.VUE_APP_BASE_API,
    // send cookies when cross-domain requests
    // withCredentials: true, 
    // 请求时间
    timeout:5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // debugger
        if(store.getters.token){
            // 让每个请求携带token 
            // ['X-Token'] 是请求头
            // 请根据实际情况进行修改
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code !== 200){
           Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5*1000
           })
        
            //    508： 非法token  512： 其他客户端已登录 514：token 已过期
            if(res.code === 508 || res.code === 512 || res.code === 514){
                // to re-login
                MessageBox.confirm('You have been logged out,  you can cancel to stay on this page, or log in again', 'Confirm logout',{
                    confirmButtonText: 'Re-Login',
                    cancelButtonText : 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload();
                    })
                })
            }
             return Promise.reject(new Error(res.message || 'Error'));
        }else{
            return res;
        }
    },
    error => {
        console.log('err' + error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5*1000
        })
        return Promise.reject(error);
    }
)

export default service;