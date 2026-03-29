<template>
  <div class="header">
    <router-link to="/" class="logo" />
    <nav class="menu">
      <router-link class="font-bold" to="/">
        首页
      </router-link>
      <router-link class="font-bold" to="/about">
        关于
      </router-link>
      <a class="cursor-pointer" @click="toggleDark">
        <div i-ri-sun-line dark:i-ri-moon-line />
      </a>
    </nav>
    <button
      title="Scroll to top"
      fixed right-3 bottom-16 w-10 h-10 hover:op100 rounded-full text-4
      hover-bg-hex-8883 bg-transparent transition duration-300 z-100 print:hidden
      border-none outline-none cursor-pointer
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
  </div>
</template>

<script setup lang="ts">
import { toggleDark } from '@/logics'

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<style scoped>

</style>
