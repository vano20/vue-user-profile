<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const userMenus = [
  {
    id: 1,
    name: 'View profile',
    to: '/profile'
  }
]

const { user, userFullName: fullName } = storeToRefs(useAuthStore())

const isLoggedIn = computed(() => !!user.value.id)
</script>

<template>
  <header>
    <nav class="flex items-center justify-between w-full h-16 px-2 lg:px-8 lg:border-b border-slate-900/10">
      <ul class="py-4">
        <li>
          <RouterLink to="/">
            <img class="mx-2" width="125" src="../assets/logoipsum.svg" alt="Company logo" />
          </RouterLink>
        </li>
      </ul>

      <RouterLink v-if="isLoggedIn" to="/profile" class="h-full md:border-l px-4">
        <div class="flex items-center gap-2 cursor-pointer h-full">
          <img class="rounded-full " width="30" :src="user.avatar" :alt="fullName" />
          <p class="hidden md:block">{{ fullName }}</p>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>
