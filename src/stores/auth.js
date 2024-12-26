import Cookie from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RepositoryFactory from '@/repository/RepositoryFactory'

const AuthRepository = RepositoryFactory.get('auth')
const UserRepository = RepositoryFactory.get('user')

export const useAuthStore = defineStore('auth', () => {
  const userIdMap = {
    ['george.bluth@reqres.in']: 1,
  }
  const user = ref({})
  const isLoggedIn = ref(false)
  const isLoading = ref(false)
  const router = useRouter()

  function setUser(userData, token) {
    user.value = userData
    isLoggedIn.value = true

    if (token) Cookie.set('authToken', `${token}-${user.value.id}`, { expires: 7, sameSite: 'strict' })
  }

  async function getUserData(id) {
    try {
      const user = await UserRepository.getUser(id)
      setUser(user?.data?.data ?? {})
    } catch (error) {
      console.log('err', error)
    } finally {
      isLoading.value = false
      router.push({ name: 'home' })
    }
  }

  async function login({ username, email, password }) {
    try {
      const response = await AuthRepository.login({
        username,
        email,
        password
      })
      const user = await UserRepository.getUser(userIdMap[email] ?? '')

      setUser(user?.data?.data ?? {}, response?.data?.token ?? '')
    } catch (error) {
      console.log('err', error)
    }
  }

  function logout() {
    user.value = {}
    isLoggedIn.value = false

    Cookie.remove('authToken')
  }

  async function checkAuthStatus() {
    isLoading.value = true
    const [token, id] = Cookie.get('authToken')?.split?.('-') ?? []

    if (token) {
      getUserData(id)
    } else {
      isLoading.value = false
    }
  }

  return { 
    user, 
    isLoggedIn, 
    isLoading,
    login, 
    logout,
    checkAuthStatus,
  }
})