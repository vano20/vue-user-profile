import axios from '@/plugins/axios'

export default {
  register({ username, email, password }) {
    return axios.post('/register', { username, email, password })
  },
  login({ username, email, password }) {
    return axios.post('/login', { username, email, password })
  },
}