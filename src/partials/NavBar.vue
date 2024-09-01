<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Popover from 'primevue/popover'
import useLogin from '@/hooks/users/useLogin'
import useSignup from '@/hooks/users/useSignup'
import useLogout from '@/hooks/users/useLogout'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

const authLinks = [
  {
    name: 'My Bookings',
    url: '/my-bookings'
  },
  {
    name: 'My Account',
    url: '/my-account'
  }
]

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const visible = ref(false)
const isSignUp = ref(false)
const op = ref()

const { mutate: login, isPending: isLoggingIn } = useLogin()
const { mutate: signup, isPending: isSigningUp } = useSignup()
const { mutate: logout, isPending: isLoggingOut } = useLogout()

const isActiveLink = (routePath) => {
  return route.path === routePath
}

const toggle = (event) => {
  op.value.toggle(event)
}

const onSelectLink = () => {
  op.value.hide()
}

const credentials = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const onSubmit = () => {
  console.log(credentials)
  if (isSignUp.value === true) {
    signup(credentials, {
      onSuccess: () => {
        router.push('/')

        visible.value = false
        isSignUp.value = false

        credentials.firstName = ''
        credentials.lastName = ''
        credentials.email = ''
        credentials.password = ''
        credentials.confirmPassword = ''

        toast.success('Successfully Signed Up!')
      },
      onError: () => {
        toast.error('There was an error!')
      }
    })
  } else {
    login(credentials, {
      onSuccess: () => {
        router.push('/')

        visible.value = false
        isSignUp.value = false
        // isSigningUp.value = false

        credentials.email = ''
        credentials.password = ''

        toast.success('Successfully Logged In!')
      },
      onError: () => {
        toast.error('There was an error!')
      }
    })
  }
}
</script>

<template>
  <!-- NavBar -->
  <header class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-4">
    <nav
      class="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto"
      aria-label="Global"
    >
      <div class="md:col-span-3">
        <!-- Logo -->
        <RouterLink
          class="flex-none rounded-xl text-xl text-primary_color inline-block font-semibold focus:outline-none focus:opacity-80"
          to="/"
          aria-label="Preline"
        >
          LOGO
        </RouterLink>
        <!-- End Logo -->
      </div>

      <!-- Button Group -->
      <div class="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
        <button
          v-if="userStore.token"
          @click="toggle"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-primary_color text-gray-50 hover:bg-secondary_color transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-secondary_color"
        >
          <i class="pi pi-user" style="font-size: 0.8rem"></i> {{ userStore.user.firstName }}
          {{ userStore.user.lastName }}
        </button>

        <button
          v-else
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-primary_color text-gray-50 hover:bg-secondary_color transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-secondary_color"
          @click="visible = true"
        >
          Sign in
        </button>
      </div>
      <!-- End Button Group -->

      <!-- Collapse -->
      <div
        id="navbar-collapse-with-animation"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
      ></div>
      <!-- End Collapse -->
    </nav>
  </header>

  <!-- Login Modal -->
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="visible"
      pt:root:class="!border-0 !bg-transparent"
      pt:mask:class="backdrop-blur-sm"
    >
      <template #container="{ closeCallback }">
        <form
          @submit.prevent="onSubmit"
          class="flex flex-col px-8 py-8 gap-6 rounded-2xl bg-primary_color/95"
        >
          <h4 class="text-white text-center text-xl font-semibold">
            {{ isSignUp ? 'SIGN UP' : 'LOGIN' }}
          </h4>

          <div v-if="isSignUp" class="inline-flex flex-col gap-2">
            <label for="firstName" class="text-primary-50 font-semibold">First Name</label>
            <InputText
              v-model="credentials.firstName"
              id="firstName"
              name="firstName"
              class="!border-0 !p-3 !text-primary-50 w-80"
              placeholder="John"
            ></InputText>
          </div>

          <div v-if="isSignUp" class="inline-flex flex-col gap-2">
            <label for="lastName" class="text-primary-50 font-semibold">Last Name</label>
            <InputText
              v-model="credentials.lastName"
              id="lastName"
              name="lastName"
              class="!border-0 !p-3 !text-primary-50 w-80"
              placeholder="Doe"
            ></InputText>
          </div>

          <div class="inline-flex flex-col gap-2">
            <label for="email" class="text-primary-50 font-semibold">Email</label>
            <InputText
              v-model="credentials.email"
              id="email"
              name="email"
              class="!border-0 !p-3 !text-primary-50 w-80"
              placeholder="doe@example.com"
            ></InputText>
          </div>

          <div class="inline-flex flex-col gap-2">
            <label for="password" class="text-primary-50 font-semibold">Password</label>
            <InputText
              v-model="credentials.password"
              id="password"
              name="password"
              class="!border-0 !p-3 !text-primary-50 w-80"
              type="password"
              placeholder="********"
            ></InputText>
          </div>

          <div v-if="isSignUp" class="inline-flex flex-col gap-2">
            <label for="confirmPassword" class="text-primary-50 font-semibold"
              >Confirm Password</label
            >
            <InputText
              v-model="credentials.confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              class="!border-0 !p-3 !text-primary-50 w-80"
              type="password"
              placeholder="********"
            ></InputText>
          </div>

          <div class="flex items-center gap-4">
            <Button
              label="Cancel"
              @click="
                () => {
                  closeCallback()
                  isSignUp.value = false
                }
              "
              text
              class="!p-3 w-full !text-white !border !border-white/30 hover:!bg-white/10"
            ></Button>
            <Button
              type="submit"
              :label="isLoggingIn || isSigningUp ? 'Loading...' : isSignUp ? 'Sign-Up' : 'Sign-In'"
              text
              class="!p-3 w-full !text-white !border !border-white/30 hover:!bg-white/10"
            ></Button>
          </div>

          <div v-if="isSignUp === false">
            <p class="text-center">
              Don't have an account?
              <span class="font-semibold cursor-pointer text-gray-50" @click="isSignUp = true"
                >Register here</span
              >
            </p>
          </div>

          <div v-if="isSignUp === true">
            <p class="text-center">
              Already have an account?
              <span class="font-semibold cursor-pointer text-gray-50" @click="isSignUp = false"
                >Login here</span
              >
            </p>
          </div>
        </form>
      </template>
    </Dialog>
  </div>

  <!-- User Popover -->
  <Popover ref="op">
    <div class="flex flex-col gap-4 w-[10rem]">
      <div class="border-b-2">
        <span class="block text-sm text-gray-500"> Signed in as</span>
        <span class="block mb-2 font-semibold">{{ userStore.user.email }} </span>
      </div>
      <div v-for="(link, index) in authLinks" :key="index">
        <RouterLink
          :class="`${
            isActiveLink(link.url) ? 'before:bg-secondary_color' : ''
          } relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1  dark:text-white`"
          :to="link.url"
          aria-current="page"
          @click="onSelectLink"
          >{{ link.name }}</RouterLink
        >
      </div>
      <Button
        @click="
          () => {
            logout()
            onSelectLink()
          }
        "
        :label="isLoggingOut ? 'Loading...' : 'Logout'"
        icon="pi pi-sign-out"
        severity="danger"
        :disabled="isLoggingOut"
      />
    </div>
  </Popover>
</template>

<style scoped></style>
