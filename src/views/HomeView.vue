<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const fullName = computed(() => `${user.value.first_name} ${user.value.last_name}`)
</script>

<template>
  <main class="p-4">
    <p class="mb-0">Welcome, {{ fullName }} !</p>
  </main>
</template>
