<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NAVBAR_HEIGHT } from '@/helper/global-constant'
import Button from '@/components/Base/Button.vue'

defineProps({
  menus: {
    type: Array,
    default: () => [],
  }
})

const isOpen = ref(false)

function toggle() {
  if (window.innerWidth >= 768) return

  isOpen.value = !isOpen.value
}

function closeOnOutsideClick() {
  if (window.innerWidth >= 768) return

  isOpen.value = false
}

defineExpose({
  toggle
})

const checkScreenSize = () => {
  if (window.innerWidth >= 768) {
    isOpen.value = true
  } else {
    isOpen.value = false
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <div v-click-outside="closeOnOutsideClick">
    <aside
      class="p-4 w-24 md:border-r border-slate-900/10 md:relative fixed bg-white shadow-lg md:shadow-none transition-all duration-300 ease-in-out"
      :class="{
        'block': !isOpen,
        '-translate-x-0': isOpen,
        '-translate-x-full': !isOpen
      }" :style="{ height: `calc(100vh - ${NAVBAR_HEIGHT})` }">
      <ul class="flex flex-col items-center gap-4">
        <li v-for="menu in menus" :key="menu.id" class="text-slate-700 cursor-pointer">
          <RouterLink class="block" :to="menu.path" activeClass="text-sky-500" @click="toggle">
            {{ menu.label }}
          </RouterLink>
        </li>
      </ul>
    </aside>

    <div class="absolute left-4 bottom-4 md:hidden z-10">
      <Button pill @click="toggle">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </Button>
    </div>
  </div>
</template>
