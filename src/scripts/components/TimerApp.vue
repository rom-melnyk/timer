<template>
  <div class="timer-app h-full flex flex-col items-stretch">
    <main class="timer-container flex-1 flex flex-col justify-center items-center px-8">
      <template v-if="state === 'Idle'">
        <TimeInput v-model="hms" />
        <div class="controls">
          <button @click="startTimer" :disabled="!canStart"><i class="icon-play"></i></button>
        </div>
      </template>

      <template v-if="state === 'Running' || state === 'Paused'">
        <ProgressRunning />
        <div class="controls">
          <button v-if="state === 'Running'" @click="pauseTimer"><i class="icon-pause"></i></button>
          <template v-if="state === 'Paused'">
            <button @click="resumeTimer" class="mr-8"><i class="icon-play"></i></button>
            <button @click="resetTimer"><i class="icon-stop"></i></button>
          </template>
        </div>
      </template>

      <template v-if="state === 'Done'">
        <ProgressDone />
        <div class="controls">
          <button @click="resetTimer"><i class="icon-ok"></i></button>
          <!-- TODO 🔁 -->
        </div>
      </template>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from "vue"
import TimeInput from "./TimeInput.vue"
import ProgressRunning from "./ProgressRunning.vue"
import ProgressDone from "./ProgressDone.vue"
import AppFooter from "./AppFooter.vue"
import { type HMS, timer } from "../timer/timer"

type States = "Idle" | "Running" | "Paused" | "Done"

export default defineComponent({
  name: "TimerApp",
  components: { AppFooter, ProgressDone, ProgressRunning, TimeInput },
  setup() {
    const state = ref<States>("Idle")
    const hms = ref<HMS>({ h: 0, m: 0, s: 0 })

    const canStart = computed(() => hms.value.h > 0 || hms.value.m > 0 || hms.value.s > 0)

    function startTimer() {
      if (!canStart) return
      timer.start(() => state.value = "Done")
      state.value = "Running"
    }
    function pauseTimer() {
      timer.pause()
      state.value = "Paused"
    }
    function resumeTimer() {
      timer.resume()
      state.value = "Running"
    }
    function resetTimer() {
      timer.reset()
      state.value = "Idle"
    }

    function listenToKeyboard(e: KeyboardEvent) {
      // console.info(e)
      if (e.key !== " " && e.key.toLowerCase() !== "enter") return
      switch (state.value) {
        case "Idle": return startTimer()
        case "Running": return pauseTimer()
        case "Paused": return resumeTimer()
        case "Done": return resetTimer()
      }
    }

    watch(hms, newHms => timer.set(newHms), { immediate: true })

    onMounted(() => window.addEventListener("keypress", listenToKeyboard))
    onUnmounted(() => window.removeEventListener("keypress", listenToKeyboard))

    return {
      state,
      hms,
      canStart,
      startTimer,
      pauseTimer,
      resumeTimer,
      resetTimer,
    }
  }
})
</script>
