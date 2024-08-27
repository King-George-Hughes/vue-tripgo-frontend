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

const links = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Trips',
    url: '/trips'
  },
  {
    name: 'Terms and Conditions',
    url: '/terms-and-conditions'
  }
]

const authLinks = [
  {
    name: 'My Bookings',
    url: '/bookings'
  },
  {
    name: 'My Account',
    url: '/account'
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
        isSigningUp.value = false

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
          <i class="pi pi-user" style="font-size: 0.8rem"></i> {{ userStore.user.email }}
        </button>

        <button
          v-else
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-primary_color text-gray-50 hover:bg-secondary_color transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-secondary_color"
          @click="visible = true"
        >
          Sign in
        </button>

        <div class="md:hidden">
          <button
            type="button"
            class="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-md border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
            data-hs-collapse="#navbar-collapse-with-animation"
            aria-controls="navbar-collapse-with-animation"
            aria-label="Toggle navigation"
          >
            <svg
              class="hs-collapse-open:hidden flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              class="hs-collapse-open:block hidden flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
      <!-- End Button Group -->

      <!-- Collapse -->
      <div
        id="navbar-collapse-with-animation"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
      >
        <div
          class="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0"
        >
          <div v-for="(link, index) in links" :key="index">
            <RouterLink
              :class="`${
                isActiveLink(link.url) ? 'before:bg-secondary_color' : ''
              } relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1  dark:text-white`"
              :to="link.url"
              aria-current="page"
              >{{ link.name }}</RouterLink
            >
          </div>
        </div>
      </div>
      <!-- End Collapse -->

      <!-- Login Dialog -->
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
          class="flex flex-col px-8 py-8 gap-6 rounded-2xl"
          style="
            background-image: radial-gradient(
              circle at left top,
              var(--p-primary-400),
              var(--p-primary-700)
            );
          "
        >
          <svg
            width="35"
            height="40"
            viewBox="0 0 35 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="block mx-auto"
          >
            <path
              d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
              fill="var(--p-primary-700)"
            />
            <path
              d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
              fill="var(--p-primary-200)"
            />
          </svg>

          <div v-if="isSignUp" class="inline-flex flex-col gap-2">
            <label for="firstName" class="text-primary-50 font-semibold">First Name</label>
            <InputText
              v-model="credentials.firstName"
              id="firstName"
              name="firstName"
              class="!bg-white/20 !border-0 !p-3 !text-primary-50 w-80"
            ></InputText>
          </div>

          <div v-if="isSignUp" class="inline-flex flex-col gap-2">
            <label for="lastName" class="text-primary-50 font-semibold">Last Name</label>
            <InputText
              v-model="credentials.lastName"
              id="lastName"
              name="lastName"
              class="!bg-white/20 !border-0 !p-3 !text-primary-50 w-80"
            ></InputText>
          </div>

          <div class="inline-flex flex-col gap-2">
            <label for="email" class="text-primary-50 font-semibold">Email</label>
            <InputText
              v-model="credentials.email"
              id="email"
              name="email"
              class="!bg-white/20 !border-0 !p-3 !text-primary-50 w-80"
            ></InputText>
          </div>

          <div class="inline-flex flex-col gap-2">
            <label for="password" class="text-primary-50 font-semibold">Password</label>
            <InputText
              v-model="credentials.password"
              id="password"
              name="password"
              class="!bg-white/20 !border-0 !p-3 !text-primary-50 w-80"
              type="password"
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
              class="!bg-white/20 !border-0 !p-3 !text-primary-50 w-80"
              type="password"
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
              :label="isLoggingIn || isSigningUp ? 'Loading...' : 'Sign-In'"
              text
              class="!p-3 w-full !text-white !border !border-white/30 hover:!bg-white/10"
            ></Button>
          </div>

          <div v-if="isSignUp === false">
            <p class="text-center">
              Don't have an account?
              <span class="font-semibold cursor-pointer" @click="isSignUp = true"
                >Register here</span
              >
            </p>
          </div>

          <div v-if="isSignUp === true">
            <p class="text-center">
              Already have an account?
              <span class="font-semibold cursor-pointer" @click="isSignUp = false">Login here</span>
            </p>
          </div>
        </form>
      </template>
    </Dialog>
  </div>

  <!-- User Popover -->
  <Popover ref="op">
    <div class="flex flex-col gap-4 w-[10rem]">
      <div>
        <span class="font-medium block"
          >{{ userStore.user.firstName }} {{ userStore.user.lastName }}</span
        >
        <small class="block mb-2">{{ userStore.user.email }} </small>
      </div>
      <div v-for="(link, index) in authLinks" :key="index">
        <RouterLink
          :class="`${
            isActiveLink(link.url) ? 'before:bg-secondary_color' : ''
          } relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1  dark:text-white`"
          :to="link.url"
          aria-current="page"
          >{{ link.name }}</RouterLink
        >
      </div>
      <Button
        @click="logout()"
        :label="isLoggingOut ? 'Loading...' : 'Logout'"
        icon="pi pi-sign-out"
        severity="danger"
        :disabled="isLoggingOut"
      />
    </div>
  </Popover>
</template>

<style scoped></style>
