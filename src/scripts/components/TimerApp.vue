<template>
  <div class="timer-app h-full flex flex-col items-stretch">
    <main class="timer-container flex-1 flex flex-col justify-center items-center px-8">
      <template v-if="timer.state.value === 'Idle'">
        <TimeInput v-model="hms" />
        <div class="controls">
          <button @click="startTimer" :disabled="!canStart"><i class="icon-play"></i></button>
        </div>
      </template>

      <template v-if="timer.state.value === 'Running' || timer.state.value === 'Paused'">
        <ProgressRunning />
        <div class="controls">
          <button v-if="timer.state.value === 'Running'" @click="timer.pause()"><i class="icon-pause"></i></button>
          <template v-if="timer.state.value === 'Paused'">
            <button @click="timer.resume()" class="mr-8"><i class="icon-play"></i></button>
            <button @click="timer.reset()"><i class="icon-stop"></i></button>
          </template>
        </div>
      </template>

      <template v-if="timer.state.value === 'Done'">
        <ProgressDone />
        <div class="controls">
          <button @click="timer.reset()"><i class="icon-ok"></i></button>
        </div>
      </template>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue"
import TimeInput from "./TimeInput.vue"
import ProgressRunning from "./ProgressRunning.vue"
import ProgressDone from "./ProgressDone.vue"
import AppFooter from "./AppFooter.vue"
import { type HMS, timer } from "../timer/timer"
import { timerStorage } from "../timer/timer-storage"

export default defineComponent({
  name: "TimerApp",
  components: { AppFooter, ProgressDone, ProgressRunning, TimeInput },
  setup() {
    const hms = ref<HMS>({ h: 0, m: 0, s: 0 })
    const canStart = computed(() => hms.value.h > 0 || hms.value.m > 0 || hms.value.s > 0)

    function startTimer() {
      if (!canStart.value) return

      timer.set(hms.value)
      timerStorage.set(hms.value)
      timer.start()
    }

    function listenToKeyboard(e: KeyboardEvent) {
      // console.info(e)
      if (e.key !== " " && e.key.toLowerCase() !== "enter") return
      switch (timer.state.value) {
        case "Idle": return startTimer()
        case "Running": return timer.pause()
        case "Paused": return timer.resume()
        case "Done": return timer.reset()
      }
    }

    onMounted(() => window.addEventListener("keypress", listenToKeyboard))
    onUnmounted(() => window.removeEventListener("keypress", listenToKeyboard))

    return {
      timer,
      hms,
      canStart,
      startTimer,
    }
  }
})
</script>
