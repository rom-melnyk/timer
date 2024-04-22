<template>
  <footer class="
    flex flex-row px-8 py-2
    text-xs whitespace-nowrap
    border-t border-t-primary-light text-primary-light
  ">
    <span class="mr-8 flex-1">Time's <s>not</s> up!</span>
    <a href="https://github.com/rom-melnyk/timer" class="mr-8">GitHub</a>
    <a href="https://melnyk.site">Melnyk ⨉ 2024</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppFooter",
})
</script>
