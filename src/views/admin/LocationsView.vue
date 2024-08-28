<script setup>
import LocationsTable from '@/features/location/LocationsTable.vue'

import useLocations from '@/hooks/locations/useLocations'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const { data: locations, isLoading } = useLocations()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <LocationsTable :locations="locations" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
