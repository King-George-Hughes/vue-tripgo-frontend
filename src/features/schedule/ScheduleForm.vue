<script setup>
import { ref, reactive, computed } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import useCreateSchedule from '@/hooks/schedules/useCreateSchedule'
import useLocations from '@/hooks/locations/useLocations'
import useBuses from '@/hooks/buses/useBuses'
import { useToast } from 'vue-toastification'
import { getRecurrenceInterval } from '@/util/helper'

const toast = useToast()
const showScheduleForm = ref(false)

const { data: locations } = useLocations()
const { data: buses } = useBuses()
const { mutate: createSchedule, isPending: isCreatingSchedule } = useCreateSchedule()

const form = reactive({
  originId: '',
  destinationId: '',
  busId: '',
  scheduleType: '',
  departureTime: '',
  arrivalTime: '',
  recurrenceInterval: '',
  price: '',
  route: ''
})

// Computed property for recurrence interval
const recurrenceInterval = computed(() => {
  return getRecurrenceInterval(form.departureTime, form.arrivalTime)
})

const onSubmit = () => {
  if (
    form.price === '' ||
    form.busId === '' ||
    form.originId === '' ||
    form.arrivalTime === '' ||
    form.departureTime === '' ||
    form.destinationId === ''
  ) {
    toast.error('All fields are required!')

    return null
  }

  form.recurrenceInterval = recurrenceInterval.value

  if (!form.recurrenceInterval) {
    toast.error('Recurrence interval could not be calculated.')
    return null
  }

  if (!form.route.trim()) {
    form.route = []
  } else {
    form.route = form.route.split(',').map((route) => route.trim())
  }

  // Convert price to a number
  form.price = Number(form.price)

  console.log(form)

  createSchedule(form, {
    onSuccess: () => {
      showScheduleForm.value = false

      form.route = ''
      form.busId = ''
      form.price = ''
      form.originId = ''
      form.arrivalTime = ''
      form.scheduleType = ''
      form.destinationId = ''
      form.departureTime = ''
      form.recurrenceInterval = ''

      toast.success('Schedule Added Successfully!')
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
      <Button label="Add Schedule" @click="showScheduleForm = true" severity="success" />

      <Dialog
        v-model:visible="showScheduleForm"
        modal
        header="Add Schedule"
        :style="{ width: '45rem' }"
      >
        <form @submit.prevent="onSubmit">
          <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Fill the details below.</span
          >

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="origin" class="font-semibold pl-2 pb-2">Origin</label>
              <Select
                v-model="form.originId"
                :options="locations"
                name="originId"
                optionLabel="name"
                optionValue="id"
                placeholder="Select Origin"
                class="flex-auto"
              />
            </div>

            <div class="w-full flex flex-col">
              <label for="destination" class="font-semibold pl-2 pb-2">Destination</label>
              <Select
                v-model="form.destinationId"
                :options="locations"
                name="destinationId"
                optionLabel="name"
                optionValue="id"
                placeholder="Select Destination"
                class="flex-auto"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="busId" class="font-semibold pl-2 pb-2">Depature</label>
              <!-- Date Picker -->
              <DatePicker
                v-model="form.departureTime"
                dateFormat="dd/mm/yy"
                showIcon
                fluid
                iconDisplay="input"
                id="datepicker-24h"
                showTime
                hourFormat="24"
              />
            </div>

            <div class="w-full flex flex-col">
              <label for="busId" class="font-semibold pl-2 pb-2">Arrival</label>
              <DatePicker
                v-model="form.arrivalTime"
                dateFormat="dd/mm/yy"
                showIcon
                fluid
                iconDisplay="input"
                id="datepicker-24h"
                showTime
                hourFormat="24"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="busId" class="font-semibold pl-2 pb-2">Bus</label>
              <Select
                v-model="form.busId"
                :options="buses"
                name="busId"
                optionLabel="model"
                optionValue="id"
                placeholder="Select Bus"
                class="flex-auto"
              />
            </div>

            <div class="w-full flex flex-col">
              <label for="scheduleType" class="font-semibold pl-2 pb-2">Schedule Type</label>
              <InputText
                id="scheduleType"
                v-model="form.scheduleType"
                name="scheduleType"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="price" class="font-semibold pl-2 pb-2">Price</label>
              <InputText
                id="price"
                v-model="form.price"
                name="price"
                class="flex-auto"
                autocomplete="off"
              />
            </div>

            <div class="w-full flex flex-col">
              <label for="recurrenceInterval" class="font-semibold pl-2 pb-2"
                >Recurrence Interval</label
              >
              <InputText
                id="recurrenceInterval"
                v-model="recurrenceInterval"
                name="recurrenceInterval"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="route" class="font-semibold pl-2 pb-2"
                >Routes
                <span class="text-xs font-normal text-red-600"
                  >(comma separated values)</span
                ></label
              >
              <InputText
                id="route"
                v-model="form.route"
                name="route"
                class="flex-auto"
                autocomplete="off"
                placeholder="e.g. savana park, junction"
              />
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <Button
              :disabled="isCreatingSchedule"
              type="button"
              label="Cancel"
              severity="secondary"
              @click="showScheduleForm = false"
            ></Button>
            <Button
              :disabled="isCreatingSchedule"
              type="submit"
              :label="isCreatingSchedule ? 'Loading...' : 'Save'"
            ></Button>
          </div>
        </form>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
