import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { isLoggedIn, checkAuthStatus } = useAuthStore()

  if (to.meta.requiresAuth && !isLoggedIn) {
    await checkAuthStatus()

    if (!isLoggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }

    return
  }

  if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'home' })
  
    return
  }

  next()
})

export default router
