import { ref, onUnmounted } from 'vue'

export function useLoadingText(text = 'Loading') {
  const loadingText = ref(text)
  const runningLoadingText = ref(null)

  function startLoadingText(isLoading) {
    runningLoadingText.value = setInterval(() => {
      const countDots = loadingText.value.split('.').length - 1
      const setDots = countDots === 3 ? 0 : countDots + 1

      loadingText.value = countDots === 0 ? 'Loading.' : `Loading${'.'.repeat(setDots)}`
      console.log('running intervals', new Date())

      if (!isLoading.value) {
        stopLoadingText()
      }
    }, 500)
  }

  function stopLoadingText() {
    if (runningLoadingText.value) {
      clearInterval(runningLoadingText.value)
      runningLoadingText.value = null
    }
  }

  onUnmounted(() => {
    stopLoadingText()
  })

  return {
    loadingText,
    startLoadingText,
    stopLoadingText
  }
}