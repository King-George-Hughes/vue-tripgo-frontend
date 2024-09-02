<script setup>
import useBuses from '@/hooks/buses/useBuses'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BusesTable from '@/features/bus/BusesTable.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { data: buses, isLoading } = useBuses()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <BusesTable :buses="buses.data" />

      <PaginationComponent urlRoute="buses" :totalPages="buses.totalPages || 1" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
