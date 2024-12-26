<script setup>
import { NAVBAR_HEIGHT } from '@/helper/global-constant'

defineProps({
  menus: {
    type: Array,
    default: () => [],
  }
})
</script>

<template>
  <aside class="p-4 w-24 border-r border-slate-900/10 hidden md:block"
    :style="{ height: `calc(100vh - ${NAVBAR_HEIGHT})` }">
    <ul class="flex flex-col items-center gap-4">
      <li v-for="menu in menus" :key="menu.id" class="text-slate-700 cursor-pointer">
        <RouterLink class="block" :to="menu.path" activeClass="text-sky-500">
          {{ menu.label }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
