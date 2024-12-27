import Cookie from 'js-cookie'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RepositoryFactory from '@/repository/RepositoryFactory'

const AuthRepository = RepositoryFactory.get('auth')
const UserRepository = RepositoryFactory.get('user')

export const useAuthStore = defineStore('auth', () => {
  const users = ref([])
  const user = ref({})
  const isLoggedIn = ref(false)
  const isLoading = ref(false)
  const router = useRouter()

  const usersIdMap = computed(() => {
    return users.value.reduce((acc, user) => {
      acc[user.email] = user.id

      return acc
    }, {})
  })
  const userFullName = computed(() => {
    return `${user.value.first_name} ${user.value.last_name}`
  })

  function setUser(userData, token) {
    user.value = userData
    isLoggedIn.value = true

    if (token) Cookie.set('authToken', `${token}-${user.value.id}`, { expires: 7, sameSite: 'strict' })
  }

  async function getUsers() {
    try {
      const res = await UserRepository.getListUsers()
      users.value = res?.data?.data ?? []
    } catch (error) {
      console.log('err', error)
    }
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
      await getUsers()
      const user = await UserRepository.getUser(usersIdMap.value[email] ?? '')

      setUser(user?.data?.data ?? {}, response?.data?.token ?? '')
    } catch (error) {
      console.log('err', error)
      return Promise.reject(error)
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

    if (token && id) {
      await getUsers()
      getUserData(id)
    } else {
      logout()
      isLoading.value = false
      router.push('/login')
    }
  }

  return { 
    user,
    users,
    usersIdMap,
    userFullName,
    isLoggedIn,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  }
})