import axios from 'axios'
import { base, ncov, ncovcity, foreignNcov, Iplogin, videohot, hotreview } from './base'
import { key } from './mykey'


import request from '@/utils/request'
// import { baseUrl } from '@/config'
// let baseUrl = '/api/gapf-query'
// if (process.env.NODE_ENV === 'development') {
//     baseUrl = '/dev'
// }
let baseUrl = '/api'
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000/api'
}
/**
 * 新接口开始
 */
// 登录
export function login(query) {
    return request({
        url: baseUrl + "/user/login",
        method: "post",
        data: query
    });
}
// 注册
export function register(query) {
    return request({
        url: baseUrl + "/user/register",
        method: "post",
        data: query
    });
}

// 获取用户信息
export function getUserInfo(query) {
    return request({
        url: baseUrl + "/user/getUserInfo",
        method: "get",
        params: query
    });
}

// 更改当前用户信息
export function setUserInfo(query) {
    return request({
        url: baseUrl + "/user/setUserInfo",
        method: "post",
        data: query
    });
}
// 
export function testNginx(query) {
    return request({
        url: baseUrl + "",
        method: "get",
        data: query
    });
}
export function getmysql(query) {
    return request({
        url: baseUrl + "/user/getmysql",
        method: "get",
        data: query
    });
}


// 下载文件
export function download(query) {
    return request({
        url: baseUrl + "/user/download",
        method: "get",
        params: query
    });
}

//上传文件
export function userUploadLogo(query) {
    return request({
        url: baseUrl + "/user/uploadLogo",
        method: "post",
        data: query,
        headers: { "Content-Type": "multipart/form-data" }
    });
}









/**
 * 新接口结束
 */



//抗击疫情数据接口
const Virus = {
    // 病毒信息title
    getCovid() {
        return axios.get(base + ncov, {
            params: {
                key
            }
        })
    },
    // 省市疫情数据
    postCovidCity() {
        return axios.post(base + ncovcity, 'key=' + key)
    },
    // 海外肺炎疫情
    getForeignNcov() {
        return axios.get(base + foreignNcov, {
            params: {
                key
            }
        })
    }
}

export default Virus;

// 一键登录请求的ip
function postIplogin() {
    // post
    return new Promise((resolve, reject) => {
        axios({
            url: base + Iplogin,
            method: 'post',
            params: {
                key
            },
            data: {
                key
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error);
        })
    });
}
export { postIplogin };

// 抖音视频的请求
export function getVideohot() {
    return axios.get(base + videohot, {
        params: {
            key
        }
    })
}

// 抑郁云热评
export function getHotReview() {
    return axios.get(base + hotreview, {
        params: {
            key
        }
    }).catch((error) => {
        console.log('网易热评', error);
    })
}

