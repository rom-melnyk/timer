<template>
  <div class="progress-done">
    <span class="time">{{ time.h }}</span>
    <span class="separator">:</span>
    <span class="time">{{ time.m }}</span>
    <span class="separator">:</span>
    <span class="time">{{ time.s }}</span>

    <span class="elapsed">elapsed</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { timer } from "../timer/timer"
import { formatHms } from "../timer/utils"

export default defineComponent({
  name: "ProgressDone",
  setup() {
    return { time: formatHms(timer.durationHms) }
  }
})
</script>
