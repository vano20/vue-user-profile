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
  isDisabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  pill: {
    type: Boolean,
    default: false,
  }
})

const variantClass = {
  primary: 'bg-sky-500 hover:bg-sky-600 text-white',
  secondary: 'bg-white hover:bg-sky-50 text-sky-500',
}

const fullWidthClass = computed(() => {
  return props.fullWidth ? 'w-full' : ''
})

const pillClass = computed(() => {
  return props.pill ? 'rounded-full shadow-xl p-2' : 'rounded-xl shadow-lg px-4 py-2'
})

const buttonClass = computed(() => {
  return `focus:outline-none focus:ring-0 border-2 border-transparent focus:border-black transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${pillClass.value} ${variantClass[props.variant] ?? ''} ${fullWidthClass.value}`
})

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="type" :disabled="isDisabled" :class="buttonClass" @click="$emit('click', $event)">
    <slot />
  </button>
</template>