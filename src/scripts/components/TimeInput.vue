<template>
  <div class="time-input">
    <div class="hms-input">
      <input type="text" minlength="1" maxlength="2" pattern="^\\d{1,2}$" v-model="time.h">
      <span class="separator">:</span>
      <input type="text" minlength="1" maxlength="2" pattern="^\\d{1,2}$" v-model="time.m">
      <span class="separator">:</span>
      <input type="text" minlength="1" maxlength="2" pattern="^\\d{1,2}$" v-model="time.s">
    </div>
    <div class="previous-values">
      <span v-for="t in previousValues">t</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
export default defineComponent({
  name: "TimeInput",
  setup() {
    const time = reactive({ h: "00", m: "00", s: "00" })
    const previousValues = ref([] as string[])

    return {
      time,
      previousValues,
    }
  }
})
</script>

<style scoped>
.hms-input input {
  width: 25%;
  padding: 10%;
}
</style>
