import './assets/main.css'
import 'primeicons/primeicons.css'
import 'preline/preline'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)

app.use(createPinia())
app.use(router)

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
