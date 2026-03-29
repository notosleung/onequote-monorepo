<template>
  <div class="footer">
    <p class="footer-text">
      <span class="copyright-text">&copy; 2026 Notos Leung.</span>
      {{ '  ' }}
      <span v-if="route.path === '/'">Inspired by <a href="https://hitokoto.cn/" target="_blank" rel="noopener noreferrer">一言</a>.</span>
    </p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>
.footer-text {
  text-align: end;
  padding: 10px 0;
  font-size: 0.9rem;
}
</style>
