import axios from 'axios'
const apiRoot = 'http://localhost:1928/'
export default {
    get: endpoint => {
        return axios.get(`${apiRoot}${endpoint}`, {withCredentials:true})

    }
}