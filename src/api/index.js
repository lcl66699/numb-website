import axios from 'axios'
import { base, ncov, ncovcity, foreignNcov, Iplogin, videohot, hotreview } from './base'
import { key } from './mykey'

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

