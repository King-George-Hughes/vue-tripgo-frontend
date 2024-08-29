<script setup>
import BusesTable from '@/features/bus/BusesTable.vue'

import useBuses from '@/hooks/buses/usebuses'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const { data: buses, isLoading } = useBuses()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <BusesTable :buses="buses" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
