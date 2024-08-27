import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTripsStore = defineStore('trips', () => {
  const trips = ref()

  function populateTrips(schedules) {
    trips.value = schedules
  }

  return { trips, populateTrips }
})
