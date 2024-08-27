<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import NavBar from './partials/NavBar.vue'
import Footer from './partials/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <VueQueryDevtools />
  <NavBar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped></style>
