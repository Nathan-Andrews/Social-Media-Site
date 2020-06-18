import axios from 'axios'
const apiRoot = 'http://localhost:1928/'
export default {
    get: endpoint => {
        return axios.get(`${apiRoot}${endpoint}`, {withCredentials:true})
    },
    post: (endpoint, data) => {
        return axios.post(`${apiRoot}${endpoint}`, data, {withCredentials:true})
    }
}