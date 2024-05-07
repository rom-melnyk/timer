<template>
  <div class="progress-container">
    <div class="progress-running" :style="{ width: `${progress}%` }"></div>
    <span class="time">{{ time.h }}</span>
    <span class="separator w-4">:</span>
    <span class="time">{{ time.m }}</span>
    <span class="separator w-4">:</span>
    <span class="time">{{ time.s }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { timer } from "../timer/timer"
import { formatHms, secondsToHms } from "../timer/utils"
import { favicon } from "../timer/favicon"

export default defineComponent({
  name: "ProgressRunning",
  setup() {
    const time = computed(() => formatHms(secondsToHms(timer.remainedSeconds.value)))
    const progress = computed(() => Math.floor((timer.progress.value) * 100 * 100) / 100)

    watch(time, ({ h, m, s }) => {
      const chunks = [h, m, s]
      let i = 0
      while (i < chunks.length && chunks[i] === "00") i++

      document.title = chunks.slice(i).join(":")
    }, { immediate: true })

    watch(timer.state, state => {
      if (state === "Running") favicon.setRunningIcon()
      else favicon.setPauseIcon()
    }, { immediate: true })


    return { time, progress }
  }
})
</script>
