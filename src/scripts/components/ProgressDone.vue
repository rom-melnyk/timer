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
    const { durationHms } = timer
    const elapsedMsg =
      `${durationHms.h}:${durationHms.m}:${durationHms.s} elapsed`
    return { elapsedMsg }
  }
})
</script>

<style scoped>

</style>
