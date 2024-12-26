<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['number', 'text', 'email', 'password'].includes(value)
  },
  id: {
    type: String,
    default: 'input-field'
  },
  placeholder: {
    type: String,
    default: 'Input field'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  isInvalid: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const inputClass = computed(() => {
  const baseClass = 'p-2 border-2 rounded-md focus:outline-none focus:ring-0 focus:border-sky-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100'

  const invalidClass = props.isInvalid ? 'border-red-300 shadow-red-600/30 focus:outline-none focus:ring-0 focus:border-red-300' : ''

  return `${baseClass} ${invalidClass}`
})

const emit = defineEmits(['input', 'update:modelValue'])

function handleInput(event) {
  emit('input', event.target.value)
  emit('update:modelValue', event.target.value)
}
</script>
<template>
  <input :value="modelValue" :class="inputClass" :type="type" :id="id" :placeholder="placeholder" :disabled="isDisabled"
    @input="handleInput" />

  <slot v-if="isInvalid" name="error">
    <p class="text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </slot>
</template>