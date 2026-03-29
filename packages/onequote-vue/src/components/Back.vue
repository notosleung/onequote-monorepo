<template>
  <RouterLink
    :to="route.path.split('/').slice(0, -1).join('/') || '/'"
    v-text="'cd ..'"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
/* a {
  color: rgba(0, 0, 0, 0.5) !important;
  font-size: 1rem;
}
a:hover {
  color: rgba(0, 0, 0, 0.75) !important;
}

html.dark a {
  color: rgba(255, 255, 255, 0.5) !important;
}
html.dark a:hover {
  color: rgba(255, 255, 255, 0.75) !important;
} */
</style>
