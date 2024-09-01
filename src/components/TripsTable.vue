<script setup>
import { formatDate } from '@/util/helper.js'
import { formatTime } from '@/util/helper.js'
import { formatDayOfWeek } from '@/util/helper.js'
import Tag from 'primevue/tag'
import BookingForm from '@/features/booking/BookingForm.vue'

defineProps({
  schedules: []
})
</script>

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
              </div>

              <div>
                <p class="text-sm lg:text-md text-gray-600 dark:text-neutral-400">
                  Browse available schedules
                </p>
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
                    class="hidden lg:table-cell px-6 py-3 text-start border-s border-gray-200 dark:border-neutral-700"
                  >
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Company / Bus
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
                      Price
                    </span>
                  </th>

                  <th scope="col" class="hidden lg:table-cell px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                    </span>
                  </th>

                  <th scope="col" class="lg:hidden px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Schedules
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr v-for="(schedule, index) in schedules" :key="schedule.id">
                  <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex items-center gap-x-3">
                      <div class="flex items-start flex-col gap-2" href="#">
                        <p class="capitalize font-semibold pl-1">
                          {{ schedule.bus.model }}
                        </p>
                        <p>
                          <Tag severity="secondary" :value="schedule.bus.plateNumber"></Tag>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex items-start gap-2 flex-col">
                      <span class="text-gray-800 text-sm"
                        ><Tag value="From:" severity="info" style="width: 50px; padding: 2px"></Tag>
                        {{ schedule.origin.name }} ({{ schedule.origin.station }})
                      </span>

                      <span class="text-gray-800">
                        <Tag value="To:" severity="info" style="width: 50px; padding: 2px"></Tag>
                        {{ schedule.destination.name }} ({{ schedule.destination.station }})</span
                      >

                      <span class="text-gray-800">
                        <Tag value="Cap:" severity="warn" style="width: 50px; padding: 2px"></Tag>
                        {{ schedule.bus.seatCapacity }}</span
                      >
                    </div>
                  </td>

                  <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex flex-col items-start gap-2">
                      <div class="text-sm text-gray-800 dark:text-neutral-200">
                        {{ formatDayOfWeek(schedule.departureTime) }} -
                        <span class="font-semibold">{{ formatDate(schedule.departureTime) }}</span>
                      </div>

                      <div class="text-sm py-1">
                        <Tag severity="secondary" :value="formatTime(schedule.departureTime)"></Tag>
                        -
                        <Tag severity="secondary" :value="formatTime(schedule.arrivalTime)"></Tag>
                      </div>
                    </div>
                  </td>

                  <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600 lowercase">
                        <Tag severity="success" :value="schedule.bus.status"></Tag>
                      </span>
                    </div>
                  </td>

                  <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-800 dark:text-neutral-200"
                        >$ {{ schedule.fare }}</span
                      >
                    </div>
                  </td>

                  <td class="hidden lg:table-cell h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 inline-flex items-center gap-3">
                      <!-- Testing Booking form -->
                      <BookingForm :schedule="schedule" />
                    </div>
                  </td>

                  <!-- Mobile View -->
                  <td class="lg:hidden h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-3 flex items-start gap-2 flex-col">
                      <div class="w-full flex justify-between">
                        <div class="flex items-start flex-col gap-2" href="#">
                          <p class="capitalize font-semibold pl-1">
                            {{ schedule.bus.model }}
                          </p>
                          <p>
                            <Tag severity="secondary" :value="schedule.bus.plateNumber"></Tag>
                          </p>
                        </div>

                        <div
                          class="font-semibold text-xl bg-black/70 w-8 h-8 rounded-full flex items-center justify-center text-gray-50"
                        >
                          {{ index + 1 }}
                        </div>
                      </div>

                      <div class="w-full flex justify-between">
                        <div class="flex items-start gap-2 flex-col">
                          <p class="underline font-semibold">Journey</p>
                          <span class="text-gray-800 text-sm"
                            ><Tag
                              value="From:"
                              severity="info"
                              style="width: 50px; padding: 2px"
                            ></Tag>
                            {{ schedule.origin.name }} ({{ schedule.origin.station }})
                          </span>

                          <span class="text-gray-800">
                            <Tag
                              value="To:"
                              severity="info"
                              style="width: 50px; padding: 2px"
                            ></Tag>
                            {{ schedule.destination.name }} ({{
                              schedule.destination.station
                            }})</span
                          >

                          <span class="text-gray-800">
                            <Tag
                              value="Cap:"
                              severity="warn"
                              style="width: 50px; padding: 2px"
                            ></Tag>
                            {{ schedule.bus.seatCapacity }}</span
                          >
                        </div>

                        <div>
                          <p class="underline font-semibold mb-1 text-end">Amount</p>
                          <p class="text-sm text-gray-800 dark:text-neutral-200">
                            $ {{ schedule.fare }}
                          </p>
                        </div>
                      </div>

                      <div class="w-full flex justify-between mt-1">
                        <div class="py-2 flex flex-col items-start gap-2">
                          <p class="underline font-semibold">Schedule</p>
                          <div class="text-sm text-gray-800 dark:text-neutral-200">
                            {{ formatDayOfWeek(schedule.departureTime) }} -
                            <span class="font-semibold">{{
                              formatDate(schedule.departureTime)
                            }}</span>
                          </div>

                          <div class="text-sm py-1">
                            <Tag
                              severity="secondary"
                              :value="formatTime(schedule.departureTime)"
                            ></Tag>
                            -
                            <Tag
                              severity="secondary"
                              :value="formatTime(schedule.arrivalTime)"
                            ></Tag>
                          </div>
                        </div>

                        <div>
                          <p class="underline font-semibold text-end mb-2">Status</p>
                          <p class="text-sm text-gray-600 lowercase">
                            <Tag severity="success" :value="schedule.bus.status"></Tag>
                          </p>
                        </div>
                      </div>

                      <div class="inline-flex items-center gap-3">
                        <BookingForm :schedule="schedule" />
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
    <!-- End Card -->
  </div>
  <!-- End Table Section -->
</template>

<style lang="scss" scoped></style>
