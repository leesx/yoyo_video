import axios from "axios";
import {message} from "antd";
const queryString = require('query-string');
import appConfig from "utils/appConfig";

//设置超时时间30s
const NET_TIMEOUT = 30*1000;

const myAxios = axios.create({
    baseURL        : appConfig.baseURL,
    headers        : {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*.leesx.com',
    },
    timeout        : NET_TIMEOUT,
    method         : 'get', // default
    withCredentials: false,
    responseType   : 'json', // default
    validateStatus : function (status) {
        return status >= 200 && status <= 304; // default
    },
    // transformRequest: [function (data) {
    //     data = Qs.stringify(data);
    // 		console.log(data)
    //     return data;
    // }
    // ],
    params         : {},
});

// 把axios上面的CancelToken方法,复制到myAxios中
if(!myAxios.CancelToken){
    myAxios.CancelToken = axios.CancelToken;
}



// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    if (response.request.responseURL.indexOf('redirectURL') > -1) {
        message.destroy()
        message.error(`登录信息已失效，请重新登录`, 1, () => {
            //当token失效的时候，清空当前域下的localStorage,以便重新请求初始化数据
            localStorage.clear();
            window.location.href = response.request.responseURL;
        })
        return {msg: '登录信息已失效，请重新登录'};
    }
    // 对响应数据做点什么
    const json = response.data || {};
    if (json && (json.success == 'false' || json.success == false)) {
        message.error(`错误代码:${json.code},错误信息：${json.msg}`, 5)
    }
    return json;
}, function (error) {
    // 对响应错误做点什么
    const res = error.response;

    if (res) {
        const json = res.data || {code: res.status, msg: res.statusText};
        message.error(`错误代码:${json.code},错误信息：${json.msg}`, 5);
    } else {
        const msg = error.message;
        message.destroy();
        if (msg.match(`timeout of ${NET_TIMEOUT}ms exceeded`)) {
            message.error('网络请求超时,请重试', 3)
        } else if (msg.match('Network Error')) {
            message.error('网络错误,请检查网络连接', 3)
        } else {
            message.error(`${msg || '哇哦,(⊙﹏⊙)出错了！'}`, 3)
        }

    }
    return Promise.reject(error)
});
export default myAxios
//扩展Promise
if(!Promise.prototype.finally){
    Promise.prototype.finally = function (callback) {
        let P = this.constructor;
        return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
            throw reason
        }));
    };
}

