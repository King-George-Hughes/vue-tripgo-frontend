<script setup>
import SchedulesTable from '@/features/schedule/SchedulesTable.vue'
import useSchedules from '@/hooks/schedules/useSchedules'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { data: schedules, isLoading } = useSchedules()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <SchedulesTable :schedules="schedules.data" />

      <PaginationComponent urlRoute="schedules" :totalPages="schedules.totalPages || 1" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
