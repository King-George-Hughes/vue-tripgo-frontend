<script setup>
import LocationsTable from '@/features/location/LocationsTable.vue'
import useLocationsWithParams from '@/hooks/locations/useLocationsWithParams'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { data: locations, isLoading } = useLocationsWithParams()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <LocationsTable :locations="locations.data" />

      <PaginationComponent urlRoute="locations" :totalPages="locations.totalPages || 1" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
