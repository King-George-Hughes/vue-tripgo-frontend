<script setup>
// import schedulesTable from '@/features/schedule/SchedulesTable.vue'

// import useSchedules from '@/hooks/drivers/useSchedules'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

// const { data: drivers, isLoading } = useDrivers()
import ScheduleForm from '@/features/schedule/ScheduleForm.vue'
</script>

<template>
  <div>
    <h3>Schedules</h3>
    <ScheduleForm />

    <!-- <div v-if="isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <DriversTable :drivers="drivers" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped></style>
