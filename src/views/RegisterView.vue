<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Input from '@/components/Base/Input.vue'
import Button from '@/components/Base/Button.vue'
import Label from '@/components/Base/Label.vue'
import RepositoryFactory from '@/repository/RepositoryFactory'

const AuthRepository = RepositoryFactory.get('auth')

const router = useRouter()
const form = ref({
  username: 'george.bluth@reqres.in',
  email: 'george.bluth@reqres.in',
  password: 'Asdf123!'
})
const invalid = ref({
  username: false,
  email: false,
  password: false
})
const required = ref({
  username: true,
  email: true,
  password: true
})
const isRegistering = ref(false);

async function registerUser() {
  try {
    isRegistering.value = true

    await AuthRepository.register({ username: form.value.username, email: form.value.email, password: form.value.password })
    router.push({ name: 'login' })
  } catch (error) {
    console.log('err', error)
  } finally {
    isRegistering.value = false
  }
}

function createAccount() {
  invalid.value.email = !form.value.email
  invalid.value.username = !form.value.username
  invalid.value.password = !form.value.password

  const valid = !invalid.value.email && !invalid.value.username && !invalid.value.password

  if (valid) registerUser()
}
</script>
<template>
  <main class="w-full h-screen flex justify-center items-center">
    <div class="w-full h-full md:w-96 md:h-auto md:rounded-2xl md:shadow-lg py-4 px-6 flex flex-col">
      <h1 class="text-4xl font-semibold mb-12 text-center">Register</h1>

      <form @submit.prevent="createAccount">
        <div class="flex flex-col gap-1.5 mb-6">
          <Label for="email" is-required>Email</label>
          <Input id="email" v-model="form.email" type="email" placeholder="Email" :is-disabled="isRegistering"
            :is-invalid="invalid.email" error-message="This field is required" />
        </div>

        <div class="flex flex-col gap-1.5 mb-6">
          <Label for="username" is-required>Username</label>
          <Input id="username" v-model="form.username" type="text" placeholder="Username" :is-disabled="isRegistering"
            :is-invalid="invalid.username" error-message="This field is required" />
        </div>

        <div class="flex flex-col gap-1.5">
          <Label for="password" is-required>Password</label>
          <Input id="password" v-model="form.password" type="password" placeholder="Password"
            :is-disabled="isRegistering" :is-invalid="invalid.password" error-message="This field is required" />
        </div>

        <div class="flex gap-4 w-full mt-12 mb-6">
          <Button variant="secondary" full-width @click="router.push({ name: 'login' })">Cancel</button>
          <Button type="submit" full-width :is-disabled="isRegistering">Create account</button>
        </div>
      </form>
    </div>
  </main>
</template>