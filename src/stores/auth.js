import Cookie from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const userObj = {
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  }
  const router = useRouter()
  const user = ref(null)
  const isLoggedIn = ref(false)
  const isLoading = ref(false)

  function login() {
    user.value = userObj
    isLoggedIn.value = true

    Cookie.set('authToken', user.value.id, { expires: 1 })
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false

    Cookie.remove('authToken')
  }

  async function checkAuthStatus() {
    isLoading.value = true

    return new Promise((resolve, reject) => {
      const authToken = Cookie.get('authToken')

      if (authToken) {
        setTimeout(() => {
          login()
          isLoading.value = false

          resolve()
        }, 8000);
      }
    })
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