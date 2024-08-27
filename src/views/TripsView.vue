<script setup>
import { useTripsStore } from '@/stores/trips'
import TripsTable from '@/components/TripsTable.vue'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const tripsStore = useTripsStore()
console.log(tripsStore.trips)
</script>

<template>
  <div>
    <TripsTable :trips="tripsStore.trips" />
  </div>
</template>

<style lang="scss" scoped></style>
