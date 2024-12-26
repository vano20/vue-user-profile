<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Input from '@/components/Base/Input.vue'
import Button from '@/components/Base/Button.vue'

const router = useRouter()
const invalid = ref({
  username: false,
  email: false,
  password: false
})

function createAccount() {
  console.log('create account')
  invalid.value.email = true
  invalid.value.username = true
  invalid.value.password = true
}
</script>
<template>
  <main class="w-full h-screen flex justify-center items-center">
    <div class="w-full h-full md:w-96 md:h-auto md:rounded-2xl md:shadow-lg py-4 px-6 flex flex-col">
      <h1 class="text-4xl font-semibold mb-12 text-center">Register</h1>

      <form @submit.prevent="createAccount">
        <div class="flex flex-col gap-1.5 mb-6">
          <label for="email" class="font-semibold">Email</label>
          <Input id="email" type="email" placeholder="Email" :is-invalid="invalid.email"
            error-message="Invalid email" />
        </div>

        <div class="flex flex-col gap-1.5 mb-6">
          <label for="username" class="font-semibold">Username</label>
          <Input id="username" type="text" placeholder="Username" :is-invalid="invalid.username"
            error-message="Invalid username" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="password" class="font-semibold">Password</label>
          <Input id="password" type="password" placeholder="Password" :is-invalid="invalid.password"
            error-message="Invalid password" />
        </div>

        <div class="flex gap-4 w-full mt-12 mb-6">
          <Button variant="secondary" full-width @click="router.push({ name: 'login' })">Cancel</button>
          <Button type="submit" full-width>Create account</button>
        </div>
      </form>
    </div>
  </main>
</template>