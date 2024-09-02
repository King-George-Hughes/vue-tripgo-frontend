<template>
  <div class="w-full">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 w-full inline-block align-middle max-w-7xl">
        <div class="bg-white shadow-sm overflow-hidden">
          <!-- Header -->
          <div
            class="px-6 py-5 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700"
          >
            <div>
              <h2 class="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                {{ title }}
              </h2>
            </div>

            <div></div>
          </div>
          <!-- End Header -->

          <!-- Table -->
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 divide-y divide-gray-200">
              <tr>
                <th
                  scope="col"
                  class="hidden lg:table-cell px-6 py-3 text-start border-s border-gray-200 dark:border-neutral-700"
                >
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    #
                  </span>
                </th>

                <th scope="col" class="hidden lg:table-cell px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Journy
                  </span>
                </th>

                <th scope="col" class="hidden lg:table-cell px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Schedule
                  </span>
                </th>

                <th scope="col" class="hidden lg:table-cell px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Status
                  </span>
                </th>

                <th scope="col" class="hidden lg:table-cell px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Amount
                  </span>
                </th>

                <th scope="col" class="hidden lg:table-cell px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Created At
                  </span>
                </th>

                <!-- Mobile View -->
                <th scope="col" class="lg:hidden px-6 py-3 text-start">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                  >
                    Booking
                  </span>
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
              <tr v-for="(booking, index) in bookings" :key="booking.id">
                <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2 flex items-center gap-x-3">
                    <div class="flex items-start flex-col gap-2" href="#">
                      <p class="capitalize font-semibold pl-1">
                        #{{ index + 1 }} - {{ booking.bookingCode }}
                      </p>
                    </div>
                  </div>
                </td>

                <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
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

                <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
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

                <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2">
                    <span class="text-sm text-gray-600 lowercase">
                      <Tag severity="success" :value="booking.status"></Tag>
                    </span>
                  </div>
                </td>

                <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2">
                    <span class="text-sm text-gray-800 dark:text-neutral-200"
                      >${{ booking.totalFare }}</span
                    >
                  </div>
                </td>

                <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-2">
                    <span class="text-sm text-gray-800 dark:text-neutral-200">{{
                      formatDateTime(booking.bookingDate)
                    }}</span>
                  </div>
                </td>

                <!-- Mobile View -->
                <td class="lg:hidden h-px w-auto whitespace-nowrap">
                  <div class="px-6 py-3 flex items-start gap-2 flex-col">
                    <p class="capitalize font-semibold pl-1">
                      #{{ index + 1 }} - {{ booking.bookingCode }}
                    </p>

                    <div class="w-full flex justify-between">
                      <div class="w-full">
                        <p class="underline font-semibold mb-2">Journy</p>
                        <p class="text-gray-800 text-sm mb-2">
                          <Tag
                            value="From:"
                            severity="info"
                            style="width: 50px; padding: 2px"
                          ></Tag>
                          {{ booking.busSchedule.origin.name }} ({{
                            booking.busSchedule.origin.station
                          }})
                        </p>

                        <p class="text-gray-800 text-sm">
                          <Tag value="To:" severity="info" style="width: 50px; padding: 2px"></Tag>
                          {{ booking.busSchedule.destination.name }} ({{
                            booking.busSchedule.destination.station
                          }})
                        </p>
                      </div>

                      <div>
                        <p class="underline font-semibold mb-2 text-end">Amount</p>
                        <p class="text-sm text-gray-800 dark:text-neutral-200">
                          ${{ booking.totalFare }}
                        </p>
                      </div>
                    </div>

                    <div class="w-full flex justify-between mt-3">
                      <div class="w-full">
                        <p class="underline font-semibold mb-2">Schedule</p>
                        <div class="flex flex-col items-start gap-2">
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
                      </div>

                      <div>
                        <p class="underline font-semibold text-end mb-2">Status</p>
                        <p class="text-sm text-gray-600 lowercase">
                          <Tag severity="success" :value="booking.status"></Tag>
                        </p>
                      </div>
                    </div>
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
import { formatDateTime } from '@/util/helper'
import Tag from 'primevue/tag'

defineProps({
  bookings: {
    type: Array
  },
  isAdmin: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Manage Bookings'
  }
})
</script>

<style lang="scss" scoped></style>
