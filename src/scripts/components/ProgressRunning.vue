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
import { timer } from "../timer"

export default defineComponent({
  name: "ProgressRunning",
  setup() {
    const { hms, seconds, progress } = timer
    const time = computed(() =>
      `${hms.value.h}:${hms.value.m}${seconds.value % 2 === 0 ? ":" : "."}${hms.value.s}`
    )
    return { time, progress }
  }
})
</script>

<style scoped>

</style>
