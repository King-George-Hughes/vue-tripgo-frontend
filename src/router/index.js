import { createRouter, createWebHistory } from 'vue-router'
import TandC from './../views/TandC.vue'
import NotFound from '../views/NotFound.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TripsView from '@/views/TripsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'trips',
      path: '/trips',
      component: TripsView
    },
    {
      name: 'login',
      path: '/login',
      component: LoginView
    },
    {
      name: 'terms-and-conditions',
      path: '/terms-and-conditions',
      component: TandC
    },

    {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard
    },
    {
      name: 'not-found',
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit()
    }, 100)
  }
})

export default router
