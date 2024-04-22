<template>
  <div class="time-input">
    <div class="hms-input">
      <input type="number" min="0" maxlength="99" v-model="hms.h">
      <span class="separator">:</span>
      <input type="number" min="0" maxlength="59" v-model="hms.m">
      <span class="separator">:</span>
      <input type="number" min="0" maxlength="59" v-model="hms.s">
    </div>
    <div class="previous-values">
      <span v-for="t in previousValues">t</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue"
import { type HMS } from "../timer/timer"

export default defineComponent({
  name: "TimeInput",
  props: {
    // Maintain the `v-model`.
    modelValue: {
      type: Object as () => HMS,
      default: { h: 0, m: 0, s: 0 }
    }
  },
  emits: [
    // Maintain the `v-model`.
    "update:modelValue",
  ],
  setup(props, { emit }) {
    const currentHms: HMS = { ...props.modelValue }
    const hms = reactive<HMS>({ ...props.modelValue })

    // TODO
    const previousValues = ref([] as string[])

    const clamps: { [key in keyof HMS]: { min: number, max: number } } = {
      h: { min: 0, max: 99 },
      m: { min: 0, max: 59 },
      s: { min: 0, max: 59 },
    }
    ;(["h", "m", "s"] as Array<keyof HMS>).forEach(key => {
      watch(() => hms[key], val => {
        const clearValue = Math.max(
          clamps[key].min,
          Math.min(clamps[key].max, val)
        )

        if (clearValue !== val) hms[key] = currentHms[key]
        else if (currentHms[key] !== val) {
          currentHms[key] = val
          emit("update:modelValue", { ...currentHms })
        }
      })
    })

    return {
      hms,
      previousValues,
    }
  }
})
</script>

<style scoped>
.hms-input input {
  width: 25vw;
  height: 25vw;
  padding: 1rem;
  font-size: 10vw;
  text-align: center;
}
</style>
