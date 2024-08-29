<script setup>
import { ref, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import useCreateBus from '@/hooks/buses/useCreateBus'
import { useToast } from 'vue-toastification'

const toast = useToast()
const showBusform = ref(false)

const { mutate: createBus, isPending: isCreatingBus } = useCreateBus()

const form = reactive({
  plateNumber: '',
  model: '',
  seatCapacity: ''
})

const onSubmit = () => {
  console.log(form)

  if (form.plateNumber === '' || form.mode === '' || form.seatCapacity === '') {
    toast.error('All fields are required!')

    return null
  }

  createBus(form, {
    onSuccess: () => {
      showBusform.value = false

      form.plateNumber = ''
      form.model = ''
      form.seatCapacity = ''

      toast.success('Bus Added Successfully!')
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
      <Button label="Add Bus" @click="showBusform = true" severity="success" />

      <Dialog v-model:visible="showBusform" modal header="Add Bus" :style="{ width: '25rem' }">
        <form @submit.prevent="onSubmit">
          <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Fill the details below.</span
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
              :disabled="isCreatingBus"
              type="button"
              label="Cancel"
              severity="secondary"
              @click="showBusform = false"
            ></Button>
            <Button
              :disabled="isCreatingBus"
              type="submit"
              :label="isCreatingBus ? 'Loading...' : 'Save'"
            ></Button>
          </div>
        </form>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
