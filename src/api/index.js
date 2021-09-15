import Axios from 'axios'

const request = Axios.create({
    baseURL: '/api',
    timeout: 30000
})

request.defaults.headers['Content-Type'] = 'application/json';

export default request
