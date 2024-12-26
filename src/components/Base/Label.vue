<script setup>
import { computed } from 'vue'

const props = defineProps({
  isRequired: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'base',
    validator: (value) => ['sm', 'base', 'lg'].includes(value)
  },
  for: {
    type: String,
    required: true
  }
})

const labelClasses = computed(() => {
  const baseClasses = 'font-semibold'
  const sizeClasses = {
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg'
  }
  const disabledClass = props.disabled ? 'text-gray-400' : ''

  return `${baseClasses} ${sizeClasses[props.size]} ${disabledClass}`
})
</script>

<template>
  <label :for="for" :class="labelClasses">
    <slot>{{ $attrs.label }}</slot>
    <span v-if="isRequired" class="text-red-500 ml-0.5">*</span>
  </label>
</template>