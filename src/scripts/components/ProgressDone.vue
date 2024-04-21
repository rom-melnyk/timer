<template>
  <div class="progress-container">
    <div
      class="progress-done h-full"
    >{{ elapsedMsg }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { timer } from "../timer"

export default defineComponent({
  name: "ProgressDone",
  setup() {
    const { durationString } = timer
    const elapsedMsg =
      `${durationString.h}:${durationString.m}:${durationString.s} elapsed`
    return { elapsedMsg }
  }
})
</script>

<style scoped>

</style>
