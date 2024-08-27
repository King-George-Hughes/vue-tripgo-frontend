import './assets/main.css'
import 'primeicons/primeicons.css'
import 'preline/preline'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'

import App from './App.vue'
import router from './router'

import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.use(Toast)

app.use(VueQueryPlugin, {
  enableDevtoolsV6Plugin: true
})

app.use(ToastService)

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'light',
      // darkModeSelector: "system",
      cssLayer: false
    }
  }
})

app.mount('#app')
