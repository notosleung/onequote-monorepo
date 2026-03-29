<template>
  <div title="ToggleTheme" @click="toggleDark">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { toggleDark } from '@/logics'

// const isDarkStore = useIsDarkStore()
</script>
