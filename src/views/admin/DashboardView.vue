<template>
  <div>
    <div>
      <OverView />

      <div v-if="isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <div v-else class="mt-10">
        <BookingsTable :bookings="bookings.data" title="Recent Bookings" />
      </div>
    </div>
  </div>
</template>

<script setup>
import OverView from '@/features/dashboard/OverView.vue'
import BookingsTable from '@/features/booking/BookingsTable.vue'
import useBookings from '@/hooks/bookings/useBookings'
const { data: bookings, isLoading } = useBookings()
</script>

<style lang="scss" scoped></style>
