<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

const variantClass = {
  primary: 'bg-sky-500 hover:bg-sky-600 text-white',
  secondary: 'bg-white hover:bg-sky-50 text-sky-500',
}

const fullWidthClass = computed(() => {
  return props.fullWidth ? 'w-full' : ''
})

const buttonClass = computed(() => {
  return `px-4 py-2 rounded-xl focus:outline-none focus:ring-0 border-2 border-transparent focus:border-black transition-colors duration-300 shadow-lg ${variantClass[props.variant] ?? ''} ${fullWidthClass.value}`
})

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="type" :disabled="disabled" :class="buttonClass" @click="$emit('click', $event)">
    <slot />
  </button>
</template>