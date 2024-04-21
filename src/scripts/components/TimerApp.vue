<template>
  <div class="timer-app">
    <div class="timer-container">
      <template v-if="state.state === 'Idle'">
        <TimeInput v-model="hms" />
        <button
          class=""
          @click="startTimer"
        >▶️</button>
      </template>

      <template v-if="state.state === 'Running'">
        <ProgressRunning />
        <div>
          <button
            v-if="isRunning"
            class=""
            @click="pauseTimer"
          >⏸️</button>
          <button
            v-if="!isRunning"
            class=""
            @click="resumeTimer"
          >▶️</button>
          <!-- TODO 🔁 -->
        </div>
      </template>

      <template v-if="state.state === 'Done'">
        <ProgressDone />
        <div>
          <button
            class=""
            @click="resetTimer"
          >✅</button>
          <!-- TODO 🔁 -->
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue"
import TimeInput from "./TimeInput.vue"
import ProgressRunning from "./ProgressRunning.vue"
import ProgressDone from "./ProgressDone.vue"
import { state } from "../fsm/fsm"
import { HMS, timer } from "../timer"

export default defineComponent({
  name: "TimerApp",
  components: { ProgressDone, ProgressRunning, TimeInput },
  setup() {
    const hms = ref<HMS>({ h: 0, m: 0, s: 0 })
    const { isRunning } = timer

    function startTimer() {
      timer.start(hms.value)
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

</style>
