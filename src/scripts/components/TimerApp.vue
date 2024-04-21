<template>
  <div class="timer-app">
    <div class="timer-container">
      <template v-if="state.state === 'Idle'">
        <TimeInput />
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
import { defineComponent, onMounted, onUnmounted } from "vue"
import TimeInput from "./TimeInput.vue"
import ProgressRunning from "./ProgressRunning.vue"
import ProgressDone from "./ProgressDone.vue"
import { States } from "../fsm/types"
import { state } from "../fsm/fsm"
import { timer } from "../timer"

export default defineComponent({
  name: "TimerApp",
  components: { ProgressDone, ProgressRunning, TimeInput },
  setup() {
    const { isRunning } = timer
    const buttonIcons: { [state in States]: string } = {
      Idle: "✅▶️⏸️🔁",
      Running: "||",
      Done: "v",
    }

    function startTimer() {
      console.info(`startTimer`)
    }
    function pauseTimer() {
      console.info(`pauseTimer`)
    }
    function resumeTimer() {
      console.info(`resumeTimer`)
    }
    function resetTimer() {
      console.info(`resetTimer`)
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
      isRunning,
      buttonIcons,
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
