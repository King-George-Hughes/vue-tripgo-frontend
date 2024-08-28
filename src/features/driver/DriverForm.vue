<script setup>
import { ref, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import useCreateDriver from '@/hooks/drivers/useCreateDriver'
import { useToast } from 'vue-toastification'

const toast = useToast()
const showDriverform = ref(false)

const { mutate: createDriver, isPending: isCreatingDriver } = useCreateDriver()

const genders = ref([{ name: 'MALE' }, { name: 'FEMALE' }])

const form = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  phoneNumber: ''
})

const onSubmit = () => {
  if (
    form.firstName === '' ||
    form.lastName === '' ||
    form.gender === '' ||
    form.phoneNumber == ''
  ) {
    toast.error('All fields are required!')

    return null
  }

  createDriver(form, {
    onSuccess: () => {
      showDriverform.value = false

      form.firstName = ''
      form.lastName = ''
      form.gender = ''
      form.phoneNumber = ''

      toast.success('Driver Added Successfully!')
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
      <Button label="Add Driver" @click="showDriverform = true" severity="success" />

      <Dialog
        v-model:visible="showDriverform"
        modal
        header="Add Driver"
        :style="{ width: '25rem' }"
      >
        <form @submit.prevent="onSubmit">
          <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Fill the details below.</span
          >
          <div class="flex items-center gap-4 mb-4">
            <label for="firstName" class="font-semibold w-24">First Name</label>
            <InputText
              id="firstName"
              v-model="form.firstName"
              name="firstName"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex items-center gap-4 mb-4">
            <label for="lastName" class="font-semibold w-24">Last Name</label>
            <InputText
              id="lastName"
              v-model="form.lastName"
              name="lastName"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex items-center gap-4 mb-4">
            <label for="gender" class="font-semibold w-24">Gender</label>
            <Select
              v-model="form.gender"
              :options="genders"
              name="gender"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Gender"
              class="flex-auto"
            />
          </div>

          <div class="flex items-center gap-4 mb-8">
            <label for="phoneNumber" class="font-semibold w-24">Phone Number</label>
            <InputText
              id="phoneNumber"
              v-model="form.phoneNumber"
              name="phoneNumber"
              class="flex-auto"
              autocomplete="off"
            />
          </div>

          <div class="flex justify-end gap-2">
            <Button
              :disabled="isCreatingDriver"
              type="button"
              label="Cancel"
              severity="secondary"
              @click="showDriverform = false"
            ></Button>
            <Button
              :disabled="isCreatingDriver"
              type="submit"
              :label="isCreatingDriver ? 'Loading...' : 'Save'"
            ></Button>
          </div>
        </form>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
