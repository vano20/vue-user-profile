import axios from '@/plugins/axios'

const resource = '/users'

export default {
  getListUsers() {
    const params = { per_page: 100 } 
    console.log(params)
    return axios.get(`${resource}`, { params })
  },
  getUser(id) {
    return axios.get(`${resource}/${id}`)
  },
}