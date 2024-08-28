<script setup>
import { ref, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import useCreateLocation from '@/hooks/locations/useCreateLocation'
import { useToast } from 'vue-toastification'

const showLoactionform = ref(false)
const { mutate: createLocation, isPending: isCreatingLocation } = useCreateLocation()

const toast = useToast()

const form = reactive({
  name: '',
  region: '',
  station: ''
})

const onSubmit = () => {
  if (form.name === '' || form.region === '' || form.station === '') {
    toast.error('All fields are required!')

    return null
  }

  createLocation(form, {
    onSuccess: () => {
      showLoactionform.value = false

      form.name = ''
      form.region = ''
      form.station = ''

      toast.success('Loaction Added Successfully!')
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
      <Button label="Add Location" @click="showLoactionform = true" severity="success" />

      <Dialog
        v-model:visible="showLoactionform"
        modal
        header="Add Location"
        :style="{ width: '25rem' }"
      >
        <form @submit.prevent="onSubmit">
          <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Fill the details below.</span
          >
          <div class="flex items-center gap-4 mb-4">
            <label for="name" class="font-semibold w-24">Name</label>
            <InputText
              id="name"
              v-model="form.name"
              name="name"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex items-center gap-4 mb-4">
            <label for="region" class="font-semibold w-24">Region</label>
            <InputText
              id="region"
              v-model="form.region"
              name="region"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex items-center gap-4 mb-8">
            <label for="station" class="font-semibold w-24">Station</label>
            <InputText
              id="station"
              v-model="form.station"
              name="station"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex justify-end gap-2">
            <Button
              :disabled="isCreatingLocation"
              type="button"
              label="Cancel"
              severity="secondary"
              @click="showLoactionform = false"
            ></Button>
            <Button
              :disabled="isCreatingLocation"
              type="submit"
              :label="isCreatingLocation ? 'Loading...' : 'Save'"
            ></Button>
          </div>
        </form>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
