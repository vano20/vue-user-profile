<script setup>
import { ref } from 'vue'

const user = ref('UserName')
</script>

<template>
  <main class="p-4">
    <p class="mb-0">Welcome, {{ user }} !</p>
  </main>
</template>
