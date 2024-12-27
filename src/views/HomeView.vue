<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user, userFullName: fullName‘ } = storeToRefs(authStore)

</script>

<template>
  <main class="p-4">
    <p class="mb-0">Welcome, {{ fullName }} !</p>
  </main>
</template>
