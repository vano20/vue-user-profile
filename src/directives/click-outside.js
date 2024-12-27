export const clickOutside = {
  mounted(el, binding) {
    const handler = (event) => {
      if (!el.contains(event.target) && binding.value) {
        binding.value(event)
      }
    }

    el.clickOutsideHandler = handler
    document.addEventListener('click', handler)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideHandler)
  }
}