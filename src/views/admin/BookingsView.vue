<script setup>
import useBookings from '@/hooks/bookings/useBookings'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BookingsTable from '@/features/booking/BookingsTable.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { data: bookings, isLoading } = useBookings()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <BookingsTable :bookings="bookings.data" />

      <PaginationComponent urlRoute="bookings" :totalPages="bookings.totalPages || 1" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
