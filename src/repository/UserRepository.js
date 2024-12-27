import axios from '@/plugins/axios'

const resource = '/users'

export default {
  getListUsers() {
    return axios.get(`${resource}`, { params: { per_page: 100 } })
  },
  getUser(id) {
    return axios.get(`${resource}/${id}`)
  },
}