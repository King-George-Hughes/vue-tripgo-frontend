<template>
  <div>
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 w-full inline-block align-middle max-w-6xl">
          <div
            class="bg-white shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700"
          >
            <!-- Header -->
            <div
              class="px-6 py-5 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700"
            >
              <div>
                <h2 class="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  Manage Schedules
                </h2>
              </div>

              <div>
                <ScheduleForm />
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
                      schedule Status
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
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr v-for="schedule in schedules" :key="schedule.id">
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex items-center gap-x-3">
                      <div class="flex items-start flex-col gap-x-2" href="#">
                        <p class="capitalize">
                          <span class="font-semibold">Model: </span>{{ schedule.bus.model }}
                        </p>
                        <p>
                          <span class="font-semibold">Plate: </span>{{ schedule.bus.plateNumber }}
                        </p>
                        <p>
                          <span class="font-semibold">Capacity: </span
                          >{{ schedule.bus.seatCapacity }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600 dark:text-neutral-200"
                        >{{ schedule.origin.name }} ({{ schedule.origin.station }}) -
                        {{ schedule.destination.name }} ({{ schedule.destination.station }})</span
                      >
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600">{{ schedule.bus.status }}</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex flex-col items-start gap-2">
                      <span class="text-sm text-gray-800 dark:text-neutral-200"
                        >{{ formatDayOfWeek(schedule.departureTime) }}
                      </span>
                      <span class="text-sm text-gray-800 dark:text-neutral-200">{{
                        formatDate(schedule.departureTime)
                      }}</span>
                      <span class="text-sm rounded-sm bg-primary_color/80 text-white px-4 py-1"
                        >{{ formatTime(schedule.departureTime) }} <br />
                        {{ formatTime(schedule.arrivalTime) }}
                      </span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-800 dark:text-neutral-200">$ 180.00</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 inline-flex items-center gap-3">
                      <button class="text-yellow-500 hover:text-yellow-600">
                        <i class="pi pi-pen-to-square"></i>
                      </button>
                      <button class="text-red-500 hover:text-red-600">
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End Table -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ScheduleForm from '@/features/schedule/ScheduleForm.vue'
import { formatDate } from '@/util/helper.js'
import { formatTime } from '@/util/helper.js'
import { formatDayOfWeek } from '@/util/helper.js'

defineProps({
  schedules: []
})
</script>

<style lang="scss" scoped></style>
