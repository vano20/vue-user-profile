import Cookie from 'js-cookie'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookie.get('authToken')}`

  return config
})

axiosInstance.interceptors.response.use(res => res, (err) => {
  if (err.response) {
    if (err.response.status === 401) {
      console.log('Unauthorized')

      Cookie.remove('token')
      Cookie.remove('role')

      window.replace('/login')
    } else if ([400, 403, 500].includes(err.response.status)) {
      console.log(err.response)

      return Promise.reject(err)
    }
  }
})

export default axiosInstance
