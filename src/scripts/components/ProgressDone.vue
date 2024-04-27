<template>
  <div class="progress-container big-text-container">{{ elapsedMsg }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { timer } from "../timer/timer"
import { formatHms } from "../timer/utils"

export default defineComponent({
  name: "ProgressDone",
  setup() {
    const { h, m, s } = formatHms(timer.durationHms)
    const elapsedMsg = `${h}:${m}:${s} elapsed`
    return { elapsedMsg }
  }
})
</script>
