import { createApp } from "vue"
import TimerApp from "./components/TimerApp.vue"

(() => {
  ;(globalThis as any).__VUE_OPTIONS_API__ = false
  ;(globalThis as any).__VUE_PROD_DEVTOOLS__ = false
  ;(globalThis as any).__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false
})()

document.addEventListener("DOMContentLoaded", function () {
  const timerApp = createApp(TimerApp)
  timerApp.mount(document.body)
})
