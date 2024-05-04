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
import { computed, defineComponent } from "vue"
import { timer } from "../timer/timer"
import { formatHms, secondsToHms } from "../timer/utils"

export default defineComponent({
  name: "ProgressRunning",
  setup() {
    const time = computed(() => formatHms(secondsToHms(timer.remainedSeconds.value)))
    const progress = computed(() => Math.floor((timer.progress.value) * 100 * 100) / 100)
    return { time, progress }
  }
})
</script>
