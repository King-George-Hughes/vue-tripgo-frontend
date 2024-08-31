<template>
  <div class="flex flex-col">
    <div class="-m-1.5">
      <div class="p-1.5 w-full inline-block align-middle max-w-6xl">
        <div class="bg-white shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
          <!-- Header -->
          <div
            class="px-6 py-5 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700"
          >
            <div>
              <h2 class="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                Manage Bookings
              </h2>
            </div>

            <div></div>
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
                    #
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
                    Scedule
                  </span>
                </th>

                <th scope="col" class="px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Status
                  </span>
                </th>

                <th scope="col" class="px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Amount
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
              <tr v-for="booking in bookings" :key="booking.id">
                <td class="h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2 flex items-center gap-x-3">
                    <div class="flex items-start flex-col gap-2" href="#">
                      <p class="capitalize font-semibold pl-1">
                        {{ booking.bookingCode }}
                      </p>
                    </div>
                  </div>
                </td>

                <td class="h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2 flex items-start gap-2 flex-col">
                    <span class="text-gray-800 text-sm"
                      ><Tag value="From:" severity="info" style="width: 50px; padding: 2px"></Tag>
                      {{ booking.busSchedule.origin.name }} ({{
                        booking.busSchedule.origin.station
                      }})
                    </span>

                    <span class="text-gray-800 text-sm">
                      <Tag value="To:" severity="info" style="width: 50px; padding: 2px"></Tag>
                      {{ booking.busSchedule.destination.name }} ({{
                        booking.busSchedule.destination.station
                      }})</span
                    >
                  </div>
                </td>

                <td class="h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2 flex flex-col items-start gap-2">
                    <div class="text-sm text-gray-800 dark:text-neutral-200">
                      {{ formatDayOfWeek(booking.busSchedule.departureTime) }} -
                      <span class="font-semibold">{{
                        formatDate(booking.busSchedule.departureTime)
                      }}</span>
                    </div>

                    <div class="text-sm py-1">
                      <Tag
                        severity="secondary"
                        :value="formatTime(booking.busSchedule.departureTime)"
                      ></Tag>
                      -
                      <Tag
                        severity="secondary"
                        :value="formatTime(booking.busSchedule.arrivalTime)"
                      ></Tag>
                    </div>
                  </div>
                </td>

                <td class="h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2">
                    <span class="text-sm text-gray-600 lowercase">
                      <Tag severity="success" :value="booking.status"></Tag>
                    </span>
                  </div>
                </td>

                <td class="h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2">
                    <span class="text-sm text-gray-800 dark:text-neutral-200"
                      >${{ booking.totalFare }}</span
                    >
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
</template>

<script setup>
import { formatDate } from '@/util/helper.js'
import { formatTime } from '@/util/helper.js'
import { formatDayOfWeek } from '@/util/helper.js'
import Tag from 'primevue/tag'

defineProps({
  bookings: []
})
</script>

<style lang="scss" scoped></style>
