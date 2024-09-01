<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/partials/NavBar.vue'
import Footer from '@/partials/Footer.vue'
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style lang="scss" scoped></style>
