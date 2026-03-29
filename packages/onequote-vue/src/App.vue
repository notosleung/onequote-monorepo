<template>
  <div class="app-container">
    <Header />
    <main class="body-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
</script>
