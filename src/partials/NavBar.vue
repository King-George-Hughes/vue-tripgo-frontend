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
  }
  // {
  //   name: 'Terms and Conditions',
  //   url: '/terms-and-conditions'
  // }
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
            <label for="email" class="text-neutral-300 font-semibold">Email</label>
            <InputText
              v-model="credentials.email"
              id="email"
              name="email"
              class="!border-0 !p-3 !text-primary-50 w-80"
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
