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
                  Manage Buses
                </h2>
              </div>

              <div class="inline-flex items-center gap-5">
                <SearchButton urlRoute="buses" />
                <busForm />
              </div>
            </div>
            <!-- End Header -->

            <!-- Table -->
            <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700">
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
                      Model
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Plate Number
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Seat Capacity
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
                      Created At
                    </span>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
                    >
                      Action
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr v-for="(bus, index) in buses" :key="bus.id">
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex items-center gap-x-3">
                      <span>{{ index + 1 }}</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2 flex items-center gap-x-3">
                      <span>{{ bus.model }} </span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600 dark:text-neutral-200">{{
                        bus.plateNumber
                      }}</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600">{{ bus.seatCapacity }}</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600">{{ bus.status }}</span>
                    </div>
                  </td>
                  <td class="h-px w-auto whitespace-nowrap">
                    <div class="px-6 py-2">
                      <span class="text-sm text-gray-600">{{
                        formatDateTime(bus.dateCreated)
                      }}</span>
                    </div>
                  </td>
                  <td class="h-px w-auto">
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
import BusForm from '@/features/bus/BusForm.vue'
import { formatDateTime } from '@/util/helper'
import SearchButton from '@/components/SearchButton.vue'

defineProps({
  buses: {
    type: Array
  }
})
</script>

<style lang="scss" scoped></style>
