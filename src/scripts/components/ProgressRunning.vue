<template>
  <div class="progress-container with-border big-text-container">
    <div class="progress-running" :style="{ width: `${progress}%` }"></div>
    <span>{{ time }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { timer } from "../timer/timer"
import { formatHms, secondsToHms } from "../timer/utils"

export default defineComponent({
  name: "ProgressRunning",
  setup() {
    const time = computed(() => {
        const { h, m, s } = formatHms(secondsToHms(timer.seconds.value))
        return `${h}:${m}${timer.seconds.value % 2 === 0 ? ":" : "."}${s}`;
      }
    )
    const progress = computed(() => Math.floor((timer.progress.value) * 100 * 100) / 100)
    return { time, progress }
  }
})
</script>

<style scoped>
.progress-container {
  @apply relative overflow-hidden;
  @apply border-accent-light dark:border-accent-dark;
  @apply text-on-accent-light dark:text-on-accent-dark;

  .progress-running {
    @apply absolute inset-0;
    @apply transition-all;
    @apply bg-accent-light dark:bg-accent-dark;
  }
}
</style>
