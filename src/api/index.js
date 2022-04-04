import Axios from 'axios'
import { Message } from 'element-ui';

const request = Axios.create({
    baseURL: '/api',
    timeout: 30000
})

request.defaults.headers['Content-Type'] = 'application/json';

// 403代表登录过期和未登录禁止访问
// 401代表无权限访问
request.interceptors.response.use(function (response) {
    if (response.data.status > 200) {
        Message({ message: response.data.message, type: 'error', center: true });
        return Promise.reject(response.data);
    } else {
        return response.data;
    }
}, function (error) {
    if (error.response.status === 403) {
        // Message({ message: '登录过期!', type: 'error', center: true, duration: 5 * 1000 });
    } else {
        Message({ message: error.response.data.message, type: 'error', center: true });
    }
    return Promise.reject(error);
});

export default request
