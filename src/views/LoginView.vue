<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Input from '@/components/Base/Input.vue'
import Button from '@/components/Base/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: 'george.bluth@reqres.in',
  email: 'george.bluth@reqres.in',
  password: 'Asdf123!'
})

const isLoggingIn = ref(false)

async function login() {
  try {
    isLoggingIn.value = true

    await authStore.login(form.value)
  } catch (error) {
    console.log('err', error)
  } finally {
    isLoggingIn.value = false

    router.push({ name: 'home' })
  }
}
</script>

<template>
  <main class="w-full h-screen flex justify-center items-center">
    <div class="w-full h-full md:w-96 md:h-auto md:rounded-2xl md:shadow-lg py-4 px-6 flex flex-col">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-semibold">Login</h1>
        <img class="w-32 rounded-md" loading="lazy" src="../assets/logoipsum.svg" />
      </div>

      <form>
        <div class="flex flex-col gap-1.5 mb-6">
          <label for="username" class="font-semibold">Username</label>
          <Input id="username" v-model="form.username" type="text" placeholder="Username" :is-disabled="isLoggingIn" />
        </div>

        <div class="flex flex-col gap-1.5 mb-6">
          <label for="email" class="font-semibold">Email</label>
          <Input id="email" v-model="form.email" type="email" placeholder="Email" :is-disabled="isLoggingIn" />
        </div>

        <div class="flex flex-col gap-1.5 mb-6">
          <label for="password" class="font-semibold">Password</label>
          <Input id="password" v-model="form.password" type="password" placeholder="Password"
            :is-disabled="isLoggingIn" />
        </div>

        <div class="block w-full mt-12">
          <Button full-width :is-loading="isLoggingIn" @click="login">Login</button>
        </div>
      </form>

      <div class="text-center mt-6">
        <RouterLink to="/register" class="text-blue-500 hover:underline hover:text-blue-600 visited:text-blue-600">
          Create new account
        </RouterLink>
      </div>
    </div>
  </main>
</template>