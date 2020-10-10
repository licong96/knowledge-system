import qs from 'qs';
import Toast from '@/components/Toast/index';

export const axiosConfig = {
    baseURL: '',

    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },

    // 请求前处理数据
    transformRequest: [(data, headers) => {
        // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
        return data;
    }],

    // 请求后的数据处理
    transformResponse: [(data) => {
        // 处理返回数据格式
        return data;
    }],

    maxContentLength: 20000,

    // 超时设置s
    timeout: 40000,
    // 跨域是否带Token
    withCredentials: false,
    responseType: 'json',
    // xsrf 设置
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    // 自定义正确代码状态码范围
    validateStatus (status) {
        return status >= 200 && status < 300
    }
}

// request 拦截器
export function request (config) {
    if (
        config.method === 'post' ||
        config.method === 'put' ||
        config.method === 'delete' ||
        config.method === 'patch'
    ) {
        config.data = qs.stringify(config.data);
    }
    
    return config;
}

// request Fail
export function requestFail (error) {

    // 自定义发送请求失败逻辑，断网，请求发送监控等

    return Promise.reject(error);
}
// response 拦截器
export function response (response) {
    const code = response.data.code;

    if (code === 110003 || code === 110004 || code === 110005 || code === 110006 || code === 100014 || code === 100024) {
        Toast({
            text: response.data.message,
        });
    }

    return response;
}

// response error
export function responseError (error) {
    Toast({
        text: '您的网络开小差了，请刷新重试一下吧',
    });
    
    return Promise.reject(error);
}