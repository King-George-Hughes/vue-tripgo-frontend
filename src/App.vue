<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
</script>

<template>
  <VueQueryDevtools />
  <RouterView />
</template>

<style scoped></style>
