<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import TripsTable from '@/components/TripsTable.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import useSearchSchedule from '@/hooks/schedules/useSearchSchedule'

const route = useRoute()

const query = reactive({
  departureDate: computed(() => route.query.departureDate),
  origin: computed(() => route.query.origin),
  destination: computed(() => route.query.destination)
})

const data = reactive({
  trips: []
})

const { mutate: searchSchedule, isPending } = useSearchSchedule()

searchSchedule(query, {
  onSuccess: (response) => {
    console.log(response)
    data.trips.splice(0, data.trips.length, ...response)
  }
})
</script>

<template>
  <div>
    <div v-if="isPending" class="text-center text-gray-500 py-6">
      <PulseLoader />
    </div>

    <div v-else>
      <TripsTable :trips="data.trips" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
