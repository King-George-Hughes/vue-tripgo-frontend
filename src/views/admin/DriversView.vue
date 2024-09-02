<script setup>
import DriversTable from '@/features/driver/DriversTable.vue'

import useDrivers from '@/hooks/drivers/useDrivers'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const { data: drivers, isLoading } = useDrivers()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <DriversTable :drivers="drivers" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
