<template>
  <div class="progress-container">
    <div
      class="progress-running h-full"
      :style="{ width: `${progress}%` }"
    >{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { timer } from "../timer/timer"
import { formatHms, secondsToHms } from "../timer/utils";

export default defineComponent({
  name: "ProgressRunning",
  setup() {
    const time = computed(() => {
        const { h, m, s } = formatHms(secondsToHms(timer.seconds.value))
        return `${h}:${m}${timer.seconds.value % 2 === 0 ? ":" : "."}${s}`;
      }
    )
    const progress = computed(() => Math.floor((timer.progress) * 100 * 100) / 100)
    return { time, progress }
  }
})
</script>

<style scoped>

</style>
