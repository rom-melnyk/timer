<template>
  <div class="timer-app h-full flex flex-col items-stretch">
    <div class="timer-container flex-1 flex flex-row items-center px-8">
      <template v-if="state.state === 'Idle'">
        <TimeInput v-model="hms" />
        <div class="controls">
          <button @click="startTimer">▶️</button>
        </div>
      </template>

      <template v-if="state.state === 'Running'">
        <ProgressRunning />
        <div class="controls">
          <button v-if="isRunning" @click="pauseTimer">⏸️</button>
          <button v-if="!isRunning" @click="resumeTimer">▶️</button>
          <!-- TODO 🔁 -->
        </div>
      </template>

      <template v-if="state.state === 'Done'">
        <ProgressDone />
        <div class="controls">
          <button @click="resetTimer">✅</button>
          <!-- TODO 🔁 -->
        </div>
      </template>
    </div>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue"
import TimeInput from "./TimeInput.vue"
import ProgressRunning from "./ProgressRunning.vue"
import ProgressDone from "./ProgressDone.vue"
import AppFooter from "./AppFooter.vue"
import { type HMS, timer } from "../timer/timer"
import { state } from "../fsm/fsm"

export default defineComponent({
  name: "TimerApp",
  components: { AppFooter, ProgressDone, ProgressRunning, TimeInput },
  setup() {
    const hms = ref<HMS>({ h: 0, m: 0, s: 0 })
    const { isRunning } = timer

    function startTimer() {
      timer.start(hms.value, () => state.value = state.value.update())
      state.value = state.value.update()
    }
    function pauseTimer() {
      timer.pause()
    }
    function resumeTimer() {
      timer.resume()
    }
    function resetTimer() {
      timer.reset()
      state.value = state.value.update()
    }

    function listenToKeyboard(e: KeyboardEvent) {
      // console.info(e)
      // e.key === " "
      // e.key.toLowerCase() === "enter"
      // startTimer()
    }

    onMounted(() => window.addEventListener("keypress", listenToKeyboard))
    onUnmounted(() => window.removeEventListener("keypress", listenToKeyboard))

    return {
      state,
      hms,
      isRunning,
      startTimer,
      pauseTimer,
      resumeTimer,
      resetTimer,
    }
  }
})
</script>

<style scoped>
.timer-container {
  & > *:first-child {
    @apply flex-1 mr-8;
  }

  & > .controls {
    @apply w-[20vw];
  }
}
</style>
