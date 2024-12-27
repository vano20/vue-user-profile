<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useLoadingText } from '@/composables/useLoadingText'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const menus = [
  {
    path: '/',
    label: 'Home',
  },
]

const authStore = useAuthStore()
const { isLoggedIn, isLoading } = storeToRefs(authStore)
const { loadingText, startLoadingText } = useLoadingText()
const sidebar = ref(null)

async function toggleSidebar() {
  sidebar?.value?.toggle?.()
}

onMounted(() => {
  startLoadingText(isLoading)
})
</script>

<template>
  <main v-if="isLoading" class="w-full h-screen flex justify-center items-center">
    <p>{{ loadingText }}</p>
  </main>

  <Header v-if="isLoggedIn && !isLoading" @toggle-sidebar="toggleSidebar" />

  <div class="flex w-full overflow-hidden">
    <Sidebar ref="sidebar" v-if="isLoggedIn && !isLoading" :menus="menus" />

    <RouterView class="flex-grow" />
  </div>
</template>
