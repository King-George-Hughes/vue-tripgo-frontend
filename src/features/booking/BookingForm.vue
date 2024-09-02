<script setup>
import { ref, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
// import InputText from 'primevue/inputtext'
import useCreateBooking from '@/hooks/bookings/useCreateBooking.js'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/util/helper.js'
import { formatTime } from '@/util/helper.js'
import { formatDayOfWeek } from '@/util/helper.js'
import Tag from 'primevue/tag'

const props = defineProps({
  schedule: {
    type: Object
  }
})

console.log(props.schedule)

const user = useUserStore().user
const toast = useToast()
const showBookingform = ref(false)

const { mutate: createBooking, isPending: isCreatingBooking } = useCreateBooking()

const form = reactive({
  busScheduleId: props.schedule.id,
  userId: user.id,
  passengers: [
    {
      firstName: 'George',
      lastName: 'Hughes',
      phoneNumber: '+23312345678',
      email: 'king@gmail.com',
      address: 'the address',
      gender: 'MALE'
    }
  ],
  passengerSameAsUser: true,
  totalAmount: props.schedule.fare,
  paymentType: 'VISA'
})

const onSubmit = () => {
  console.log(form)

  createBooking(form, {
    onSuccess: () => {
      showBookingform.value = false

      form.busScheduleId = 0
      form.userId = {}
      form.passengers = []
      form.passengerSameAsUser = true
      form.totalAmount = 0
      form.paymentType = 'VISA'

      toast.success('Schedule Booked Successfully!')
    },
    onError: () => {
      toast.error('There was an error!')
    }
  })
}
</script>

<template>
  <div>
    <div class="card flex justify-center">
      <button
        class="bg-primary_color/80 px-3 py-1 rounded-md text-white"
        @click="showBookingform = true"
      >
        Book Now
      </button>

      <Dialog
        v-model:visible="showBookingform"
        modal
        header="Book a Schedule"
        class="w-[30rem] p-0"
      >
        <!-- <div class="w-full flex items-start gap-10">
          <div>
            <h4 class="underline font-semibold">Bus Detail</h4>
            <p>{{ props.schedule.bus.model }}</p>
            <p>{{ props.schedule.bus.plateNumber }}</p>
          </div>

          <div>
            <h4 class="underline font-semibold">Bus Detail</h4>
            <p>{{ props.schedule.bus.model }}</p>
            <p>{{ props.schedule.bus.plateNumber }}</p>
          </div>
        </div> -->

        <!-- <form @submit.prevent="onSubmit">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">
            {{ props.schedule.id }}</span
          >

          <div class="flex items-center gap-4 mb-4">
            <label for="model" class="font-semibold w-24">Model</label>
            <InputText
              id="model"
              v-model="form.model"
              name="model"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex items-center gap-4 mb-4">
            <label for="plateNumber" class="font-semibold w-24">Number Plate</label>
            <InputText
              id="plateNumber"
              v-model="form.plateNumber"
              name="plateNumber"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex items-center gap-4 mb-8">
            <label for="seatCapacity" class="font-semibold w-24">Capacity</label>
            <InputText
              id="seatCapacity"
              v-model="form.seatCapacity"
              name="seatCapacity"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex justify-end gap-2">
            <Button
              :disabled="isCreatingBooking"
              type="button"
              label="Cancel"
              severity="secondary"
              @click="showBookingform = false"
            ></Button>
            <Button
              :disabled="isCreatingBooking"
              type="submit"
              :label="isCreatingBooking ? 'Loading...' : 'Save'"
            ></Button>
          </div>
        </form> -->

        <div class="relative flex flex-col bg-white">
          <div
            class="relative overflow-hidden min-h-32 bg-primary_color/90 text-center rounded-t-xl"
          >
            <!-- SVG Background Element -->
            <figure class="absolute inset-x-0 bottom-0 -mb-px">
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 1920 100.1"
              >
                <path
                  fill="currentColor"
                  class="fill-white dark:fill-neutral-800"
                  d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                ></path>
              </svg>
            </figure>
            <!-- End SVG Background Element -->
          </div>

          <div class="relative z-10 -mt-12">
            <!-- Icon -->
            <span
              class="mx-auto flex justify-center items-center size-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm"
            >
              <i class="pi pi-car" style="font-size: 1.2rem"></i>
            </span>
            <!-- End Icon -->
          </div>

          <!-- Body -->
          <div class="p-4 sm:p-7 overflow-y-auto">
            <div class="text-center">
              <h3
                id="hs-ai-modal-label"
                class="text-lg font-semibold text-gray-800 dark:text-neutral-200"
              >
                Book Schedule For
              </h3>
              <p
                class="text-sm text-gray-500 dark:text-neutral-500 inline-flex items-center justify-center gap-3"
              >
                {{ props.schedule.origin.region }} ({{ props.schedule.origin.name }})
                <i class="pi pi-arrow-right-arrow-left"></i>
                {{ props.schedule.destination.region }} ({{ props.schedule.destination.name }})
              </p>
            </div>

            <!-- Grid -->
            <div class="mt-5 sm:mt-10 grid grid-cols-1 gap-3">
              <div>
                <span class="block text-xs uppercase text-gray-500 dark:text-neutral-500"
                  >Schedule:</span
                >
                <div class="py-2 flex flex-col items-start gap-2">
                  <div class="text-sm text-gray-800 dark:text-neutral-200">
                    {{ formatDayOfWeek(props.schedule.departureTime) }} -
                    <span class="font-semibold">{{
                      formatDate(props.schedule.departureTime)
                    }}</span>
                  </div>

                  <div class="text-sm py-1">
                    <Tag
                      severity="secondary"
                      :value="formatTime(props.schedule.departureTime)"
                    ></Tag>
                    -
                    <Tag severity="secondary" :value="formatTime(props.schedule.arrivalTime)"></Tag>
                  </div>
                </div>
              </div>
              <!-- End Col -->

              <div>
                <span class="block text-xs uppercase text-gray-500 dark:text-neutral-500"
                  >Payment method:</span
                >
                <div class="flex items-center gap-x-2">
                  <svg
                    class="size-5"
                    width="400"
                    height="248"
                    viewBox="0 0 400 248"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path d="M254 220.8H146V26.4H254V220.8Z" fill="#FF5F00" />
                      <path
                        d="M152.8 123.6C152.8 84.2 171.2 49 200 26.4C178.2 9.2 151.4 0 123.6 0C55.4 0 0 55.4 0 123.6C0 191.8 55.4 247.2 123.6 247.2C151.4 247.2 178.2 238 200 220.8C171.2 198.2 152.8 163 152.8 123.6Z"
                        fill="#EB001B"
                      />
                      <path
                        d="M400 123.6C400 191.8 344.6 247.2 276.4 247.2C248.6 247.2 221.8 238 200 220.8C228.8 198.2 247.2 163 247.2 123.6C247.2 84.2 228.8 49 200 26.4C221.8 9.2 248.6 0 276.4 0C344.6 0 400 55.4 400 123.6Z"
                        fill="#F79E1B"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="400" height="247.2" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200"
                    >•••• 4242</span
                  >
                </div>
              </div>
              <!-- End Col -->
            </div>
            <!-- End Grid -->

            <div class="mt-5 sm:mt-8">
              <h4 class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                Summary
              </h4>

              <ul class="mt-3 flex flex-col">
                <li
                  class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200"
                >
                  <div class="flex items-center justify-between w-full">
                    <span>Trip</span>
                    <span>${{ props.schedule.fare }}</span>
                  </div>
                </li>
                <li
                  class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200"
                >
                  <div class="flex items-center justify-between w-full">
                    <span>Tax fee</span>
                    <span>$2</span>
                  </div>
                </li>
                <li
                  class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                >
                  <div class="flex items-center justify-between w-full">
                    <span>Total Amount</span>
                    <span>${{ props.schedule.fare + 2 }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Button -->
            <form @submit.prevent="onSubmit" class="mt-5 flex justify-end gap-x-2">
              <Button
                :disabled="isCreatingBooking"
                type="button"
                label="Cancel"
                severity="secondary"
                @click="showBookingform = false"
              ></Button>
              <Button
                :disabled="isCreatingBooking"
                type="submit"
                severity="success"
                :label="isCreatingBooking ? 'Booking.....' : 'Book Now'"
              ></Button>
            </form>
            <!-- End Buttons -->
          </div>
          <!-- End Body -->
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
