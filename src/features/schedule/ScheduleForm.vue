<script setup>
import { ref, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import useCreateSchedule from '@/hooks/schedules/useCreateSchedule'
import useLocations from '@/hooks/locations/useLocations'
import useBuses from '@/hooks/buses/useBuses'
import { useToast } from 'vue-toastification'

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

const isSubmitting = ref(false)

const onSubmit = () => {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  if (
    form.price === '' ||
    form.busId === '' ||
    form.originId === '' ||
    form.arrivalTime === '' ||
    form.departureTime === '' ||
    form.destinationId === ''
  ) {
    toast.error('All fields are required!')
    isSubmitting.value = false
    return
  }

  if (!form.route.trim()) {
    form.route = []
  } else {
    form.route = form.route.split(',').map((route) => route.trim())
  }

  form.price = Number(form.price)

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
    },
    onSettled: () => {
      isSubmitting.value = false
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
          <span class="text-surface-500 dark:text-surface-400 block mb-8">
            Fill the details below.
          </span>

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="origin" class="font-semibold pl-2 pb-2">Origin</label>
              <Select
                v-model="form.originId"
                :options="locations"
                filter
                name="originId"
                optionValue="id"
                optionLabel="name"
                placeholder="Select Origin"
                class="w-full"
              >
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name }} - {{ slotProps.option.station }}</div>
                  </div>
                </template>
              </Select>
            </div>

            <div class="w-full flex flex-col">
              <label for="destination" class="font-semibold pl-2 pb-2">Destination</label>
              <Select
                v-model="form.destinationId"
                :options="locations"
                filter
                name="destinationId"
                optionValue="id"
                optionLabel="name"
                placeholder="Select Destination"
                class="w-full"
              >
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name }} - {{ slotProps.option.station }}</div>
                  </div>
                </template>
              </Select>
            </div>
          </div>

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="departureTime" class="font-semibold pl-2 pb-2">Departure</label>
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
              <label for="arrivalTime" class="font-semibold pl-2 pb-2">Arrival</label>
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
                filter
                name="busId"
                optionValue="id"
                optionLabel="model"
                placeholder="Select Bus"
                class="w-full"
              >
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.model }} - ({{ slotProps.option.plateNumber }})</div>
                  </div>
                </template>
              </Select>
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
              <label for="recurrenceInterval" class="font-semibold pl-2 pb-2">
                Recurrence Interval
              </label>
              <InputText
                id="recurrenceInterval"
                v-model="form.recurrenceInterval"
                name="recurrenceInterval"
                class="flex-auto"
                autocomplete="off"
                placeholder="e.g. PT30h"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 mb-4">
            <div class="w-full flex flex-col">
              <label for="route" class="font-semibold pl-2 pb-2">
                Routes
                <span class="text-xs font-normal text-red-600"> (comma separated values) </span>
              </label>
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
              :disabled="isCreatingSchedule || isSubmitting"
              type="button"
              label="Cancel"
              severity="secondary"
              @click="showScheduleForm = false"
            />
            <Button
              :disabled="isCreatingSchedule || isSubmitting"
              type="submit"
              :label="isCreatingSchedule ? 'Loading...' : 'Save'"
            />
          </div>
        </form>
      </Dialog>
    </div>
  </div>
</template>
