import axios from 'axios'

let requests = axios.create({
    baseURL:'/mock',
    timeout:5000
})

export default requests