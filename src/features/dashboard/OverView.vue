<script setup>
import OverViewCard from './OverViewCard.vue'
import useBookings from '@/hooks/bookings/useBookings'
import useSchedules from '@/hooks/schedules/useSchedules'
import useBuses from '@/hooks/buses/useBuses'
import useLocationsWithParams from '@/hooks/locations/useLocationsWithParams'

const { data: bookings, isLoading: isLoadingBookings } = useBookings()
const { data: schedules, isLoading: isLoadingSchedules } = useSchedules()
const { data: locations, isLoading: isLoadingLocations } = useLocationsWithParams()
const { data: buses, isLoading: isLoadingBuses } = useBuses()
</script>

<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
    <div v-if="isLoadingBookings">Loading...</div>
    <div v-else>
      <OverViewCard
        title="Total Bookings"
        :results="bookings.totalElements"
        icon="pi-list-check"
        color="blue"
      />
    </div>

    <div v-if="isLoadingSchedules">Loading...</div>
    <div v-else>
      <OverViewCard
        title="Total Schedules"
        :results="schedules.totalElements"
        icon="pi-calendar-clock"
        color="grey"
      />
    </div>

    <div v-if="isLoadingLocations">Loading...</div>
    <div v-else>
      <OverViewCard
        title="Total Locations"
        :results="locations.totalElements"
        icon="pi-map-marker"
        color="green"
      />
    </div>

    <div v-if="isLoadingBuses">Loading...</div>
    <div v-else>
      <OverViewCard title="Total Buses" :results="buses.length" icon="pi-car" color="purple" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
