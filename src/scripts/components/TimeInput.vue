<template>
  <div class="time-input">
    <div class="hms-input whitespace-nowrap text-center">
      <input type="number" min="0" maxlength="99" v-model="hms.h" value="00">
      <span class="separator w-8">:</span>
      <input type="number" min="0" maxlength="59" v-model="hms.m" value="00">
      <span class="separator w-8">:</span>
      <input type="number" min="0" maxlength="59" v-model="hms.s" value="00">
    </div>
    <div class="previous-values mt-8">
      <i class="icon-history"></i>
      <template v-if="previousValues.length > 0">
        <span v-for="(hms, i) in previousValues" :key="`timers-${i}`" class="link-like ml-4" @click="applyPreviousValue(hms.hms)">
          <span class="as-time">{{ hms.asString.h }}</span>
          <span class="as-separator">:</span>
          <span class="as-time">{{ hms.asString.m }}</span>
          <span class="as-separator">:</span>
          <span class="as-time">{{ hms.asString.s }}</span>
        </span>
      </template>
      <span v-else class="ml-4">&hellip;</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue"
import { type HMS } from "../timer/timer"
import { formatHms, validateAndFixHMS } from "../timer/utils"
import { timerStorage } from "../timer/timer-storage"

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

    const previousValues = ref(
      timerStorage
        .get()
        .map(v => ({ hms: v, asString: formatHms(v) }))
    )

    function applyPreviousValue(newHms: HMS) {
      currentHms.h = newHms.h
      currentHms.m = newHms.m
      currentHms.s = newHms.s
      hms.h = newHms.h
      hms.m = newHms.m
      hms.s = newHms.s

      emit("update:modelValue", { ...currentHms })
    }

    ;(["h", "m", "s"] as Array<keyof HMS>).forEach(key => {
      watch(() => hms[key], val => {
        const clearValue = validateAndFixHMS(key, val)
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
      applyPreviousValue,
    }
  }
})
</script>
