<script setup>
import useUserBookings from '@/hooks/bookings/useUserBookings'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BookingsTable from '@/features/booking/BookingsTable.vue'

const { data: bookings, isLoading } = useUserBookings()
</script>

<template>
  <div class="w-full">
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else class="w-full container mx-auto">
      <BookingsTable :bookings="bookings" :isAdmin="false" title="My Bookings" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
