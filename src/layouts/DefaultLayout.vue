<script setup>
import NavBar from '@/partials/NavBar.vue'
import Footer from '@/partials/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped></style>
