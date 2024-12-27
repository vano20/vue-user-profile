<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useAuthStore())

const authStore = useAuthStore()
const router = useRouter()

const fullName = computed(() => `${user.value.first_name} ${user.value.last_name}`)

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}

</script>
<template>
  <main class="p-4 md:w-full">
    <div class="flex w-full items-center justify-between mb-4 gap-4">
      <h2 class="text-2xl font-semibold">My Profile</h2>

      <a class="text-sky-500 mr-4 cursor-pointer" @click="logout">Logout</a>
    </div>

    <div class="flex flex-col md:flex-row items-center w-full mb-4 p-4 border-2 rounded-2xl">
      <img class="w-24 h-24 rounded-full mr-4 object-cover shadow-lg opacity-0 transition-opacity duration-300"
        onload="this.classList.remove('opacity-0'); this.classList.add('opacity-100')" loading="lazy" :src="user.avatar"
        :data-src="user.avatar" :alt="fullName">

      <div class="text-center md:text-start">
        <p class="text-lg font-semibold">{{ fullName }}</p>
        <p class="text-gray-600">{{ user.email }}</p>
      </div>
    </div>

    <!-- TODO: Add personal information -->
    <!-- <div class="flex flex-col w-full mb-4 p-4 border-2 rounded-2xl">
      <h2 class="text-2xl font-semibold">Personal Information</h2>

      <div class="grid grid-rows-4 grid-flow-col gap-4">
        <div>01</div>
        <div>02</div>
      </div>
    </div> -->

  </main>
</template>

<style></style>
