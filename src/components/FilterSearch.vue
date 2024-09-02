<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import Select from 'primevue/select'
// import DatePicker from 'primevue/datepicker'
import { useToast } from 'vue-toastification'
import useLocations from '@/hooks/locations/useLocations'

import { DatePicker, Select } from '@/hooks/usePrimevueComponents'

const router = useRouter()
const toast = useToast()
const { data: locationsData } = useLocations()

const selectedCityFrom = ref()
const selectedCityTo = ref()
const locations = ref(locationsData)

const selectedDate = ref()

const onSubmit = () => {
  if (!selectedCityFrom.value || !selectedCityTo.value) {
    toast.error('All fields are required!')
    return null
  }

  router.push({
    name: 'trips',
    query: {
      departureDate: selectedDate.value.toISOString().split('T')[0],
      origin: selectedCityFrom.value?.name,
      destination: selectedCityTo.value?.name
    }
  })
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-center gap-5">
    <!-- From Location -->
    <Select
      v-model="selectedCityFrom"
      :options="locations"
      filter
      optionLabel="name"
      placeholder="From"
      class="w-full md:w-56"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Select>

    <!-- To Location -->
    <Select
      v-model="selectedCityTo"
      :options="locations"
      filter
      optionLabel="name"
      placeholder="To"
      class="w-full md:w-56"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Select>

    <!-- Date Picker -->
    <DatePicker v-model="selectedDate" dateFormat="dd/mm/yy" showIcon fluid iconDisplay="input" />

    <!-- Search Button -->
    <button
      type="submit"
      @click="onSubmit"
      class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-primary_color to-secondary_color hover:from-primary_color hover:to-tertiary_color border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 py-3 px-4"
      href="#"
    >
      Search
      <svg
        class="flex-shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>
</template>
