<template>
  <!-- Table Section -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Card -->
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div
            class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700"
          >
            <!-- Header -->
            <div
              class="px-6 py-5 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700"
            >
              <div>
                <h2 class="text-xl lg:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
                  Available Trips
                </h2>
                <p class="text-sm lg:text-md text-gray-600 dark:text-neutral-400">
                  Browse available routes
                </p>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <DatePicker
                    v-model="filterDate"
                    dateFormat="dd/mm/yy"
                    showIcon
                    fluid
                    iconDisplay="input"
                  />
                </div>
              </div>
            </div>
            <!-- End Header -->

            <!-- Table -->
            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead
                class="bg-gray-50 divide-y divide-gray-200 dark:bg-neutral-800 dark:divide-neutral-700"
              >
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start border-s border-gray-200 dark:border-neutral-700"
                  >
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Company / Bus
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Journy
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Trip Status
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Schedule
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Price
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr v-for="trip in trips" :key="trip.id">
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex items-center gap-x-3">
                      <div class="flex items-start flex-col gap-x-2" href="#">
                        <p class="capitalize">
                          <span class="font-semibold">Model: </span>{{ trip.bus.model }}
                        </p>
                        <p><span class="font-semibold">Plate: </span>{{ trip.bus.plateNumber }}</p>
                        <p>
                          <span class="font-semibold">Capacity: </span>{{ trip.bus.seatCapacity }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600 dark:text-neutral-200"
                        >{{ trip.origin.name }} ({{ trip.origin.station }}) -
                        {{ trip.destination.name }} ({{ trip.destination.station }})</span
                      >
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600">{{ trip.bus.status }}</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex flex-col items-start gap-2">
                      <span class="text-sm text-gray-800 dark:text-neutral-200"
                        >{{ formatDayOfWeek(trip.departureTime) }}
                      </span>
                      <span class="text-sm text-gray-800 dark:text-neutral-200">{{
                        formatDate(trip.departureTime)
                      }}</span>
                      <span class="text-sm rounded-sm bg-primary_color/80 text-white px-4 py-1"
                        >{{ formatTime(trip.departureTime) }} <br />
                        {{ formatTime(trip.arrivalTime) }}
                      </span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-800 dark:text-neutral-200">$ 180.00</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <button
                        class="bg-primary_color text-white px-3 py-1 rounded-md hover:bg-secondary_color"
                      >
                        Book Ticket
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End Table -->

            <!-- Footer -->
            <div
              class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700"
            >
              <div>
                <p class="text-sm text-gray-600 dark:text-neutral-400">
                  <span class="font-semibold text-gray-800 dark:text-neutral-200">9</span>
                  results
                </p>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  >
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
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Prev
                  </button>

                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  >
                    Next
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
              </div>
            </div>
            <!-- End Footer -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Card -->
  </div>
  <!-- End Table Section -->
</template>

<script setup>
import { ref } from 'vue'
import DatePicker from 'primevue/datepicker'
import { formatDate } from '@/util/helper.js'
import { formatTime } from '@/util/helper.js'
import { formatDayOfWeek } from '@/util/helper.js'

defineProps({
  trips: []
})

const filterDate = ref('')
</script>

<style lang="scss" scoped></style>
