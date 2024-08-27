<template>
  <div>
    <AdminNavBar />
    <AdminSideBar />
    <div class="w-full lg:ps-64">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AdminNavBar from '@/partials/admin/AdminNavBar.vue'
import AdminSideBar from '@/partials/admin/AdminSideBar.vue'
</script>

<style lang="scss" scoped></style>
