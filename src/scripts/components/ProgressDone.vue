<template>
  <div class="progress-done">
    <span class="time">{{ time.h }}</span>
    <span class="separator w-4">:</span>
    <span class="time">{{ time.m }}</span>
    <span class="separator w-4">:</span>
    <span class="time">{{ time.s }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { timer } from "../timer/timer"
import { formatHms } from "../timer/utils"
import { favicon } from "../timer/favicon"

export default defineComponent({
  name: "ProgressDone",
  setup() {
    const time = formatHms(timer.durationHms)

    favicon.setDoneIcon()
    document.title = `Timer's up: ${time.h}:${time.m}:${time.s}`

    return { time }
  }
})
</script>
