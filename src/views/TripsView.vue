<script setup>
// import { computed } from 'vue'
import { useTripsStore } from '@/stores/trips'
import TripsTable from '@/components/TripsTable.vue'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const tripsStore = useTripsStore()
// const trips = computed(() => tripsStore.trips)
// console.log(trips.value)
console.log(tripsStore.trips)

// Function to format date
// const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' }
//   return new Date(dateString).toLocaleDateString(undefined, options)
// }
</script>

<template>
  <div>
    <!-- <TripsTable :trips="trips" /> -->
    <TripsTable :trips="tripsStore.trips" />
  </div>
</template>

<style lang="scss" scoped></style>
