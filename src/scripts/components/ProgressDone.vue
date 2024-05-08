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
import { defineComponent, onUnmounted } from "vue"
import { timer } from "../timer/timer"
import { formatHms } from "../timer/utils"
import { favicon } from "../favicon"

export default defineComponent({
  name: "ProgressDone",
  setup() {
    const time = formatHms(timer.durationHms)

    favicon.setDoneIcon()
    document.title = `Timer's up: ${time.h}:${time.m}:${time.s}`

    // The content is placed into the 📂 dist/
    // See the `parcel-reporter-static-files-copy` plugin and the `package.json#staticFiles`
    const audio = new Audio("./acoustic-arpeggio.wav")

    function play() {
      audio.currentTime = 0
      audio.play()
    }

    play()
    const timerId = setInterval(play, 10 * 1000)

    onUnmounted(() => clearInterval(timerId) && audio.pause())

    return { time }
  }
})
</script>
