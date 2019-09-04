import axios from 'axios'
import {getCookie} from './util'

//axios 配置
axios.defaults.timeout=5000;
axios.defaults.baseURL='';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = getCookie('session');
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        };
        if(token){
            config.params = {'token': token}
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        if(response.data.errCode == 2){
            router.push({
                path:'/login',
                query:{redirect: router.currentRoute.fullPath}
            })
        }
    }
)